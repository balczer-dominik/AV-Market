import { User } from "../entities/User";
import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
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
  UNKNOWN_ERROR_SERVER,
  USERNAME_TAKEN,
  USER_BANNED,
  USER_NOT_FOUND,
} from "../resource/strings";
import { COOKIE_NAME, FORGOT_PASSWORD_PREFIX } from "../constants";
import { v4 } from "uuid";
import { sendEmail } from "../util/sendMail";
import { changePasswordEmail } from "../util/changePasswordEmail";
import { FieldError } from "../util/type-graphql/FieldError";
import { isAuth } from "../middleware/authMiddleware";
import { validateEmail } from "../validators/validateEmail";
import { Upload } from "../util/type-graphql/Upload";
import { GraphQLUpload } from "apollo-server-express";
import { GraphQLScalarType } from "graphql";
import { createWriteStream } from "fs";

@Resolver(User)
export class UserResolver {
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
        return {
          errors: [
            {
              field: "username",
              message: USERNAME_TAKEN,
            },
          ],
        };
      }

      return {
        errors: [
          {
            field: "username",
            message: UNKNOWN_ERROR_SERVER,
          },
        ],
      };
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
      return {
        errors: [
          {
            field: "usernameOrEmail",
            message: USER_NOT_FOUND,
          },
        ],
      };
    }

    //Password validation
    const valid = await argon2.verify(user.password, password);
    if (!valid) {
      return {
        errors: [
          {
            field: "password",
            message: INCORRECT_PASSWORD,
          },
        ],
      };
    }

    if (user.banned) {
      return {
        errors: [
          {
            field: "usernameOrEmail",
            message: USER_BANNED,
          },
        ],
      };
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

  @Query(() => User, { nullable: true })
  me(@Ctx() { req }: MyContext): Promise<User | undefined> | null {
    if (!req.session.userId) {
      return null;
    }

    return User.findOne(req.session.userId);
  }

  @UseMiddleware(isAuth)
  @Mutation(() => Boolean)
  async uploadAvatar(
    @Arg("avatar", () => GraphQLUpload as GraphQLScalarType)
    file: Upload,
    @Ctx() { req }: MyContext
  ): Promise<boolean> {
    const { createReadStream, filename } = await file;

    return new Promise(
      async (resolve, reject) =>
        await createReadStream()
          .pipe(
            createWriteStream(
              __dirname + `/../../../web/public/avatar/${filename}`
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
  async changeEmail(
    @Arg("email") newEmail: string,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const errors = validateEmail(newEmail);

    if (errors) {
      return { errors };
    }

    await User.update(req.session.userId as number, { email: newEmail });

    let user;
    await User.findOne(req.session.userId).then((u) => {
      user = u;
    });

    return { user };
  }
}
