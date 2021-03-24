import { User } from "../entities/User";
import {
  Arg,
  Ctx,
  FieldResolver,
  Float,
  Int,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { UserResponse } from "../util/type-graphql/UserResponse";
import { UsernamePasswordInput } from "../util/type-graphql/UsernamePasswordInput";
import { MyContext } from "../types";
import { validateRegister } from "../validators/validateRegister";
import argon2 from "argon2";
import { getConnection } from "typeorm";
import {
  INCORRECT_PASSWORD,
  INVALID_TOKEN,
  UNKNOWN_ERROR_SERVER,
  USERNAME_TAKEN,
  USER_BANNED,
  USER_NOT_FOUND,
  USER_NO_LONGER_EXISTS,
} from "../resource/strings";
import { COOKIE_NAME, FORGOT_PASSWORD_PREFIX } from "../constants";
import { v4 } from "uuid";
import { sendEmail } from "../util/sendMail";
import { changePasswordEmail } from "../util/changePasswordEmail";
import { FieldError } from "../util/type-graphql/FieldError";
import { isAuth } from "../middleware/authMiddleware";
import { Upload } from "../util/type-graphql/Upload";
import { GraphQLUpload } from "apollo-server-express";
import { GraphQLScalarType } from "graphql";
import { createWriteStream } from "fs";
import randomstring from "randomstring";
import { validatePassword } from "../validators/validatePassword";
import { errorResponse } from "../util/errorResponse";
import { ContactsInput } from "../util/type-graphql/ContactsInput";
import { validateContacts } from "../validators/validateContacts";
import { Ad } from "../entities/Ad";
import { PaginatedAds } from "../util/type-graphql/PaginatedAds";
import node_geocoder from "node-geocoder";

@Resolver(User)
export class UserResolver {
  @FieldResolver(() => Int)
  async adCount(@Root() user: User): Promise<number> {
    return (await Ad.find({ where: { ownerId: user.id } })).length;
  }

  @FieldResolver(() => [Ad])
  async recent(@Root() user: User) {
    const ads = await Ad.find({
      where: {
        ownerId: user.id,
      },
      order: {
        featured: "DESC",
        updatedAt: "DESC",
      },
      take: 5,
    });
    return ads;
  }

  @Query(() => PaginatedAds)
  async userAds(
    @Arg("userId", () => Int) userId: number,
    @Arg("limit", () => Int, { nullable: true, defaultValue: 50 })
    limit: number,
    @Arg("offset", () => Int, { nullable: true, defaultValue: 0 })
    offset: number
  ): Promise<PaginatedAds> {
    const limitPlusOne = limit + 1;

    const user = await User.findOne(userId);

    const ads = await Ad.find({
      where: { ownerId: userId },
      order: { createdAt: "DESC" },
      take: limitPlusOne,
      skip: offset,
    });

    return {
      owner: user,
      ads: ads.slice(0, limit),
      hasMore: ads.length === limitPlusOne,
    };
  }

  @FieldResolver(() => [Float, Float], { nullable: true })
  async coords(@Root() user: User) {
    if (!user.city && !user.county) {
      return;
    }

    const test = node_geocoder({
      provider: "mapquest",
      apiKey: "TmNcUU4EbYFwGNcAAAdaR7AWR7Fd4mCI",
    });

    const res = (
      await test.geocode(`${user.county ?? ""}, ${user.city ?? ""}`)
    )[0];

    return [res.longitude, res.latitude];
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg("options") options: UsernamePasswordInput,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const errors = validateRegister(options);

    if (errors) return { errors };

    const hashedPassword = await argon2.hash(options.password);

    let user: User;

    try {
      const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(User)
        .values({
          username: options.username,
          email: options.email,
          password: hashedPassword,
        })
        .returning("*")
        .execute();

      user = result.raw[0];
    } catch (err) {
      if (err.detail.includes("already exists")) {
        return errorResponse("username", USERNAME_TAKEN);
      }

      return errorResponse("username", UNKNOWN_ERROR_SERVER);
    }

    req.session.userId = user.id;

    return { user };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("usernameOrEmail") usernameOrEmail: string,
    @Arg("password") password: string,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const user = await User.findOne(
      usernameOrEmail.includes("@")
        ? { where: { email: usernameOrEmail } }
        : { where: { username: usernameOrEmail } }
    );

    //No user
    if (!user) {
      return errorResponse("usernameOrEmail", USER_NOT_FOUND);
    }

    //Password validation
    const valid = await argon2.verify(user.password, password);
    if (!valid) {
      return errorResponse("password", INCORRECT_PASSWORD);
    }

    if (user.banned) {
      return errorResponse("usernameOrEmail", USER_BANNED);
    }

    req.session.userId = user.id;

    return {
      user,
    };
  }

  @Mutation(() => FieldError, { nullable: true })
  async forgotPassword(
    @Arg("username") username: string,
    @Ctx() { redis }: MyContext
  ): Promise<FieldError | null> {
    const user = await User.findOne({ where: { username } });

    if (!user) return { field: "username", message: USER_NOT_FOUND };
    if (user.banned) return { field: "username", message: USER_BANNED };

    const token = v4();

    await redis.set(
      FORGOT_PASSWORD_PREFIX + token,
      user.id,
      "ex",
      1000 * 60 * 60 // 1 óra
    );

    await sendEmail(user.email, changePasswordEmail(token));

    return null;
  }

  @Mutation(() => UserResponse)
  async resetPassword(
    @Arg("token") token: string,
    @Arg("newPassword") newPassword: string,
    @Ctx() { redis, req }: MyContext
  ): Promise<UserResponse> {
    const errors = validatePassword(newPassword);

    if (errors) {
      return { errors };
    }

    const key = FORGOT_PASSWORD_PREFIX + token;
    const userId = await redis.get(key);
    if (!userId) {
      return errorResponse("username", INVALID_TOKEN);
    }

    const userIdNum = parseInt(userId);
    const user = await User.findOne(userIdNum);

    if (!user || user.banned) {
      return errorResponse("username", USER_NO_LONGER_EXISTS);
    }

    await User.update(
      { id: userIdNum },
      { password: await argon2.hash(newPassword) }
    );
    await redis.del(key);

    req.session.userId = user.id;

    return { user };
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: MyContext) {
    return new Promise((resolve) => {
      req.session.destroy((err) => {
        res.clearCookie(COOKIE_NAME);
        if (err) {
          resolve(false);
          console.log(err);
          return;
        }
        resolve(true);
      });
    });
  }

  @UseMiddleware(isAuth)
  @Query(() => User, { nullable: true })
  async me(@Ctx() { req }: MyContext): Promise<User> {
    const user = await User.findOne(req.session.userId);
    return user as User;
  }

  @UseMiddleware(isAuth)
  @Mutation(() => Boolean)
  async uploadAvatar(
    @Arg("avatar", () => GraphQLUpload as GraphQLScalarType)
    file: Upload,
    @Ctx() { req }: MyContext
  ): Promise<boolean> {
    const { createReadStream } = await file;

    const filename = randomstring.generate(30);

    return new Promise(
      async (resolve, reject) =>
        await createReadStream()
          .pipe(
            createWriteStream(
              __dirname + `/../../../web/public/avatar/${filename}.png`
            )
          )
          .on("finish", () => {
            User.update(req.session!.userId!, { avatar: filename });
            resolve(true);
          })
          .on("error", (err) => {
            console.log(err);
            reject(false);
          })
    );
  }

  @UseMiddleware(isAuth)
  @Mutation(() => UserResponse)
  async changeContacts(
    @Arg("contacts") contacts: ContactsInput,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const errors = validateContacts(contacts);

    if (errors) {
      return { errors };
    }

    const user = await User.findOne(req.session.userId);

    user!.email = contacts.email !== "" ? contacts.email! : user!.email;
    user!.phone = contacts.phone !== "" ? contacts.phone! : user!.phone;
    user!.messenger =
      contacts.messenger !== "" ? contacts.messenger! : user!.messenger;

    user!.save();

    return { user };
  }

  @UseMiddleware(isAuth)
  @Mutation(() => UserResponse)
  async changeLocation(
    @Ctx() { req }: MyContext,
    @Arg("county", { nullable: true }) newCounty?: string,
    @Arg("city", { nullable: true }) newCity?: string
  ): Promise<UserResponse> {
    if (newCounty) {
      await User.update(req.session.userId!, { county: newCounty });
    }
    if (newCity) {
      await User.update(req.session.userId!, { city: newCity });
    }

    const user = await User.findOne(req.session.userId);

    return { user };
  }

  @UseMiddleware(isAuth)
  @Mutation(() => UserResponse)
  async changePassword(
    @Arg("oldPassword") oldPassword: string,
    @Arg("newPassword") newPassword: string,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const user = await User.findOne(req.session.userId);

    //Authorization
    const authorized = await argon2.verify(user!.password, oldPassword);
    if (!authorized) {
      return errorResponse("oldPassword", INCORRECT_PASSWORD);
    }

    //Validation
    const validationErrors = validatePassword(newPassword);
    if (validationErrors) {
      return { errors: validationErrors };
    }

    user!.password = await argon2.hash(newPassword);
    user!.save();

    return { user };
  }

  @Query(() => User)
  async user(
    @Arg("id", () => Int, { nullable: true }) id: number
  ): Promise<User | undefined> {
    return await User.findOne(id);
  }
}
