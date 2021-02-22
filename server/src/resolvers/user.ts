import { User } from "../entities/User";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { UserResponse } from "../entities/util/UserResponse";
import { UsernamePasswordInput } from "../entities/util/UsernamePasswordInput";
import { MyContext } from "../types";
import { validateRegister } from "../validators/validateRegister";
import argon2 from "argon2";
import { getConnection } from "typeorm";
import {
  UNKNOWN_ERROR_SERVER,
  USERNAME_TAKEN,
  USER_NOT_FOUND,
} from "../resource/strings";

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
            message: "Incorrect password.",
          },
        ],
      };
    }

    req.session.userId = user.id;

    return {
      user,
    };
  }
}
