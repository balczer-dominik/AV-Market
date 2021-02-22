import { User } from "../entities/User";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { UserResponse } from "../entities/util/UserResponse";
import { UsernamePasswordInput } from "../entities/util/UsernamePasswordInput";
import { MyContext } from "../types";
import { validateRegister } from "../validators/validateRegister";
import argon2 from "argon2";
import { getConnection } from "typeorm";
import { UNKNOWN_ERROR_SERVER, USERNAME_TAKEN } from "../resource/strings";

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

      return { errors: [
          {
              field: "username",
              message: UNKNOWN_ERROR_SERVER
          }
      ]}
    }

    req.session.userId = user.id;

    return { user,}
  }
}
