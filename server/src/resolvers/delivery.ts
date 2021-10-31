import { MyContext } from "src/types";
import {
  Arg,
  Ctx,
  Int,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { Any, Brackets, getConnection, Not } from "typeorm";
import { Ad } from "../entities/Ad";
import { Delivery } from "../entities/Delivery";
import { NearbyDriver } from "../entities/NearbyDriver";
import { User } from "../entities/User";
import { isAuth } from "../middleware/authMiddleware";
import { DeliveryInput } from "../util/type-graphql/DeliveryInput";
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
  incomingRequests(@Ctx() { req }: MyContext): Promise<Delivery[]> {
    return Delivery.createQueryBuilder()
      .where(
        new Brackets((qb) =>
          qb
            .where('"sellerId" = :userid')
            .andWhere('"sellerApproval" IS NULL')
            .andWhere('"driverApproval" IS NOT FALSE')
        )
      )
      .orWhere(
        new Brackets((qb) =>
          qb
            .where('"driverId" = :userid')
            .andWhere('"driverApproval" IS NULL')
            .andWhere('"sellerApproval" IS NOT FALSE')
        )
      )
      .leftJoinAndSelect("Delivery.seller", "seller")
      .leftJoinAndSelect("Delivery.driver", "driver")
      .leftJoinAndSelect("Delivery.buyer", "buyer")
      .leftJoinAndSelect("Delivery.ad", "ad")
      .setParameter("userid", req.session.userId)
      .getMany();
  }

  @UseMiddleware(isAuth)
  @Query(() => [Delivery])
  ongoingDeliveries(@Ctx() { req }: MyContext): Promise<Delivery[]> {
    return Delivery.createQueryBuilder()
      .where(
        new Brackets((qb) =>
          qb
            .where('"sellerId" = :userid')
            .andWhere('"sellerApproval" = true')
            .andWhere('"buyerApproval" IS NULL')
            .andWhere('"driverApproval" IS NOT FALSE')
        )
      )
      .orWhere(
        new Brackets((qb) =>
          qb
            .where('"driverId" = :userid')
            .andWhere('"driverApproval" = true')
            .andWhere('"buyerApproval" IS NULL')
            .andWhere('"sellerApproval" IS NOT FALSE')
        )
      )
      .orWhere(
        new Brackets((qb) =>
          qb
            .where('"buyerId" = :userid')
            .andWhere('"driverApproval" IS NOT FALSE')
            .andWhere('"buyerApproval" IS NOT FALSE')
            .andWhere('"sellerApproval" IS NOT FALSE')
        )
      )
      .leftJoinAndSelect("Delivery.seller", "seller")
      .leftJoinAndSelect("Delivery.driver", "driver")
      .leftJoinAndSelect("Delivery.buyer", "buyer")
      .leftJoinAndSelect("Delivery.ad", "ad")
      .setParameter("userid", req.session.userId)
      .getMany();
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
      .leftJoinAndSelect("Delivery.seller", "seller")
      .leftJoinAndSelect("Delivery.driver", "driver")
      .leftJoinAndSelect("Delivery.buyer", "buyer")
      .leftJoinAndSelect("Delivery.ad", "ad")
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
      delivery.buyerApproval !== null ||
      delivery.driverApproval === false ||
      delivery.sellerApproval !== null
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
      delivery.buyerApproval !== null ||
      delivery.sellerApproval === false ||
      delivery.driverApproval !== null
    ) {
      return false;
    }

    delivery.driverApproval = true;
    delivery.save();

    return true;
  }

  @UseMiddleware(isAuth)
  @Mutation(() => Boolean)
  async declineDelivery(
    @Ctx() { req }: MyContext,
    @Arg("id", () => Int) id: number
  ): Promise<boolean> {
    const delivery = await Delivery.findOne(id, {
      relations: ["buyer", "seller", "driver"],
    });
    const userId = req.session.userId;

    if (!delivery) {
      return false;
    }

    if (
      delivery.seller.id == userId &&
      delivery.driverApproval !== false &&
      delivery.buyerApproval === null &&
      delivery.sellerApproval === null
    ) {
      delivery.sellerApproval = false;
      delivery.save();
      return true;
    } else if (
      delivery.driver.id == userId &&
      delivery.sellerApproval !== false &&
      delivery.buyerApproval === null &&
      delivery.driverApproval === null
    ) {
      delivery.driverApproval = false;
      delivery.save();
      return true;
    } else if (
      delivery.buyer.id == userId &&
      delivery.driverApproval === true &&
      delivery.buyerApproval === null &&
      delivery.sellerApproval === true
    ) {
      delivery.buyerApproval = false;
      delivery.save();
      return true;
    }

    return false;
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
      delivery.buyerApproval !== null ||
      delivery.sellerApproval !== true ||
      delivery.driverApproval !== true
    ) {
      return false;
    }

    delivery.buyerApproval = true;
    delivery.save();

    return true;
  }
}
