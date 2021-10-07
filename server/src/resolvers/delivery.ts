import { isAuth } from "../middleware/authMiddleware";
import { Ctx, Query, Resolver, UseMiddleware } from "type-graphql";
import { Delivery } from "../entities/Delivery";
import { User } from "../entities/User";
import { MyContext } from "src/types";

@Resolver(Delivery)
export class DeliveryResolver {
  @UseMiddleware(isAuth)
  @Query(() => [User])
  nearbyDrivers(@Ctx() { req }: MyContext): Promise<User[]> {
    const user = req;

    //TODO: replace with real values
    return User.find({ where: { id: 2 } });
  }
}
