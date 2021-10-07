import { isAuth } from "../middleware/authMiddleware";
import { Arg, Ctx, Int, Query, Resolver, UseMiddleware } from "type-graphql";
import { Delivery } from "../entities/Delivery";
import { User } from "../entities/User";
import { MyContext } from "src/types";
import { getConnection } from "typeorm";
import { NearbyDriver } from "../entities/NearbyDriver";

@Resolver(Delivery)
export class DeliveryResolver {
  @UseMiddleware(isAuth)
  @Query(() => [NearbyDriver], { nullable: true })
  async nearbyDrivers(
    @Ctx() { req }: MyContext,
    @Arg("sellerId", () => Int) sellerId: number
  ): Promise<NearbyDriver[] | null> {
    const buyer = (await User.findOne(req.session.userId))!;
    const seller = await User.findOne(sellerId);

    if (!seller) {
      return [];
    }

    //If neither the seller nor the buyer has their location set we return the latest drivers
    if (!buyer.longitude && !seller.longitude) {
      return User.find({
        where: { delivers: true },
        order: { updatedAt: "DESC" },
      });
    }

    const divideBy = buyer.longitude && seller.longitude ? 2 : 1;

    const driverIds = await getConnection()
      .createQueryBuilder(User, "user")
      .select("user.id, user.username, user.email, user.phone")
      .addSelect(
        "(user.longitude - :longitude)^2 + (user.latitude - :latitude)^2",
        "distance"
      )
      .groupBy("user.id")
      .where("user.delivers = TRUE")
      .orderBy("distance", "ASC")
      .setParameters({
        longitude:
          ((buyer.longitude ?? 0) + (seller.longitude ?? 0)) / divideBy,
        latitude: ((buyer.latitude ?? 0) + (seller.latitude ?? 0)) / divideBy,
      })
      .getRawMany();

    const drivers: NearbyDriver[] = await User.findByIds(
      driverIds.map((r) => r.id)
    );

    return drivers.map((d) => {
      d.distance = driverIds.find((r) => r.id === d.id).distance;
      return d;
    });
  }
}
