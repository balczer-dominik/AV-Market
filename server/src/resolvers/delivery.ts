import { isAuth } from "../middleware/authMiddleware";
import {
  Arg,
  Ctx,
  Int,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { Delivery } from "../entities/Delivery";
import { User } from "../entities/User";
import { MyContext } from "src/types";
import { Brackets, getConnection, Not } from "typeorm";
import { NearbyDriver } from "../entities/NearbyDriver";
import { DeliveryInput } from "../util/type-graphql/DeliveryInput";
import { Ad } from "../entities/Ad";
import { DeliveryResponse as SubmitDeliveryResponse } from "../util/type-graphql/DeliveryResponse";
import { validateDelivery } from "../validators/validateDelivery";

@Resolver(Delivery)
export class DeliveryResolver {
  @UseMiddleware(isAuth)
  @Mutation(() => Boolean)
  async toggleDelivers(
    @Ctx() { req }: MyContext,
    @Arg("to", () => Boolean) to: boolean
  ): Promise<boolean> {
    const user = await User.findOne(req.session.userId);
    if (!user!.latitude && to) {
      return false;
    }
    return User.update(req.session.userId!, { delivers: to }).then(
      (_) => true,
      (_) => false
    );
  }

  @UseMiddleware(isAuth)
  @Query(() => Delivery, { nullable: true })
  delivery(
    @Ctx() { req }: MyContext,
    @Arg("id", () => Int) id: number
  ): Promise<Delivery | undefined> {
    return Delivery.createQueryBuilder()
      .where(
        new Brackets((qb) =>
          qb
            .where('"buyerId" = :userid')
            .orWhere('"sellerId" = :userid')
            .orWhere('"driverId" = :userid')
        )
      )
      .andWhere("id = :id", { id })
      .setParameter("userid", req.session.userId)
      .getOne();
  }

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
      .andWhere("user.id != :ownId")
      .orderBy("distance", "ASC")
      .take(20)
      .setParameters({
        longitude:
          ((buyer.longitude ?? 0) + (seller.longitude ?? 0)) / divideBy,
        latitude: ((buyer.latitude ?? 0) + (seller.latitude ?? 0)) / divideBy,
        ownId: buyer.id,
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

  @UseMiddleware(isAuth)
  @Mutation(() => SubmitDeliveryResponse)
  async submitDeliveryRequest(
    @Ctx() { req }: MyContext,
    @Arg("input", () => DeliveryInput)
    {
      adId,
      sellerId,
      driverId,
      latitude,
      longitude,
      time,
      notes,
    }: DeliveryInput
  ): Promise<SubmitDeliveryResponse> {
    const buyer = await User.findOne(req.session.userId);
    const seller = await User.findOne(sellerId);
    const driver = await User.findOne(driverId);
    const ad = await Ad.findOne(adId);
    const timeParsed = new Date(parseInt(time));
    console.log(timeParsed);

    const errors = validateDelivery(
      timeParsed,
      longitude,
      latitude,
      buyer,
      seller,
      driver,
      ad
    );

    if (errors) {
      return errors;
    }

    const delivery = {
      buyerId: req.session.userId,
      driverId,
      sellerId,
      adId,
      notes,
      time: timeParsed,
      longitude,
      latitude,
    };

    const res = await Delivery.insert(delivery);

    return { delivery: { ...delivery, ...res.raw[0] } };
  }

  @UseMiddleware(isAuth)
  @Query(() => [Delivery])
  sentDeliveryRequests(
    @Ctx() { req }: MyContext,
    @Arg("page", () => Int) page: number
  ): Promise<Delivery[]> {
    return Delivery.find({
      where: {
        buyerId: req.session.userId,
        buyerApproval: null,
        sellerApproval: Not(false),
        driverApproval: Not(false),
      },
      order: { updatedAt: "DESC" },
      skip: (page - 1) * 10,
      take: 10,
    });
  }

  @UseMiddleware(isAuth)
  @Query(() => [Delivery])
  incomingDeliveryRequests(
    @Ctx() { req }: MyContext,
    @Arg("page", () => Int) page: number
  ): Promise<Delivery[]> {
    return Delivery.find({
      where: {
        sellerId: req.session.userId,
        buyerApproval: null,
        sellerApproval: Not(false),
        driverApproval: Not(false),
      },
      order: { updatedAt: "DESC" },
      skip: (page - 1) * 10,
      take: 10,
    });
  }

  @UseMiddleware(isAuth)
  @Query(() => [Delivery])
  incomingDriverRequests(
    @Ctx() { req }: MyContext,
    @Arg("page", () => Int) page: number
  ): Promise<Delivery[]> {
    return Delivery.find({
      where: {
        driverId: req.session.userId,
        buyerApproval: null,
        sellerApproval: Not(false),
        driverApproval: Not(false),
      },
      order: { updatedAt: "DESC" },
      skip: (page - 1) * 10,
      take: 10,
    });
  }

  @UseMiddleware(isAuth)
  @Query(() => [Delivery])
  deliveryHistory(
    @Ctx() { req }: MyContext,
    @Arg("page", () => Int) page: number
  ): Promise<Delivery[]> {
    return Delivery.createQueryBuilder()
      .where(
        new Brackets((qb) =>
          qb
            .where('"buyerApproval" IS NOT null')
            .orWhere('"sellerApproval" = false')
            .orWhere('"driverApproval" = false')
        )
      )
      .andWhere(
        new Brackets((qb) =>
          qb
            .where('"buyerId" = :userid')
            .orWhere('"sellerId" = :userid')
            .orWhere('"driverId" = :userid')
        )
      )
      .skip((page - 1) * 10)
      .take(10)
      .setParameter("userid", req.session.userId)
      .getMany();
  }

  @UseMiddleware(isAuth)
  @Mutation(() => Boolean)
  async approveDeliveryBySeller(
    @Ctx() { req }: MyContext,
    @Arg("id", () => Int) id: number
  ): Promise<boolean> {
    const delivery = await Delivery.findOne(id);

    if (
      !delivery ||
      delivery.sellerId !== req.session.userId ||
      delivery.sellerApproval === false ||
      delivery.buyerApproval !== null ||
      delivery.driverApproval === false
    ) {
      return false;
    }

    delivery.sellerApproval = true;
    delivery.save();

    return true;
  }

  @UseMiddleware(isAuth)
  @Mutation(() => Boolean)
  async approveDeliveryByDriver(
    @Ctx() { req }: MyContext,
    @Arg("id", () => Int) id: number
  ): Promise<boolean> {
    const delivery = await Delivery.findOne(id);

    if (
      !delivery ||
      delivery.driverId !== req.session.userId ||
      delivery.sellerApproval === false ||
      delivery.buyerApproval !== null ||
      delivery.driverApproval === false
    ) {
      return false;
    }

    delivery.driverApproval = true;
    delivery.save();

    return true;
  }

  @UseMiddleware(isAuth)
  @Mutation(() => Boolean)
  async finalizeDelivery(
    @Ctx() { req }: MyContext,
    @Arg("id", () => Int) id: number
  ): Promise<boolean> {
    const delivery = await Delivery.findOne(id);

    if (
      !delivery ||
      delivery.buyerId !== req.session.userId ||
      delivery.sellerApproval !== true ||
      delivery.buyerApproval !== null ||
      delivery.driverApproval !== true
    ) {
      return false;
    }

    delivery.buyerApproval = true;
    delivery.save();

    return true;
  }
}
