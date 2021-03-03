import { User } from "../entities/User";
import { PaginatedUsers } from "../util/type-graphql/PaginatedUsers";
import {
  Arg,
  Int,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { getConnection } from "typeorm";
import { isAdmin } from "../middleware/authMiddleware";

@Resolver(User)
export class UserAdministrationResolver {
  //Felhasználók lekérése (pagination)
  @UseMiddleware(isAdmin)
  @Query(() => PaginatedUsers)
  async getUsers(
    @Arg("limit", () => Int, { defaultValue: 50 }) limit: number,
    @Arg("offset", () => Int, { defaultValue: 0 }) offset: number
  ): Promise<PaginatedUsers> {
    const limitPlusOne = limit + 1;

    const users = await getConnection()
      .getRepository(User)
      .createQueryBuilder()
      .orderBy("id")
      .skip(offset)
      .take(limitPlusOne)
      .getMany();

    return {
      users: users.slice(0, limit),
      hasMore: users.length === limitPlusOne,
    };
  }

  //Felhasználó tiltása
  @UseMiddleware(isAdmin)
  @Mutation(() => Boolean)
  async banUser(@Arg("id", () => Int) id: number) {
    await User.update(id, { banned: true });
    return true;
  }

  //Tiltás feloldása
  @UseMiddleware(isAdmin)
  @Mutation(() => Boolean)
  async unbanUser(@Arg("id", () => Int) id: number) {
    await User.update(id, { banned: false });
    return true;
  }
}
