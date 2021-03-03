import { AdResponse } from "../util/type-graphql/AdResponse";
import {
  Arg,
  Ctx,
  FieldResolver,
  Int,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { isAuth } from "../middleware/authMiddleware";
import { PostInput } from "../util/type-graphql/PostInput";
import { MyContext } from "../types";
import { validatePost } from "../validators/validatePost";
import { Ad } from "../entities/Ad";
import { MainCategory, Wear } from "../resource/strings";
import { User } from "../entities/User";
import { getConnection } from "typeorm";
import { PaginatedAds } from "../util/type-graphql/PaginatedAds";

@Resolver(Ad)
export class AdResolver {
  //Tulajdonos
  @FieldResolver(() => User)
  async owner(@Root() ad: Ad) {
    return await User.findOne(ad.ownerId);
  }

  //Hirdetés feladás
  @UseMiddleware(isAuth)
  @Mutation(() => AdResponse)
  async post(
    @Arg("options") { category, subCategory, title, price, wear }: PostInput,
    @Ctx() { req }: MyContext
  ): Promise<AdResponse> {
    const errors = validatePost(title, price);

    if (errors) {
      return { errors };
    }

    const partialAd: Partial<Ad> = {
      category: category as MainCategory,
      location: "Budapest",
      subCategory: subCategory,
      title: title,
      price: price,
      wear: wear as Wear,
      ownerId: req.session.userId,
    };

    const ad: Ad = (
      await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Ad)
        .values(partialAd)
        .returning("*")
        .execute()
    ).raw[0];

    return { ad };
  }

  //Hirdetések lekérdezése (pagination)
  @Query(() => PaginatedAds)
  async ads(
    @Arg("limit", () => Int, { defaultValue: 50 }) limit: number,
    @Arg("offset", () => Int, { defaultValue: 0 }) offset: number
  ): Promise<PaginatedAds> {
    const limitPlusOne = limit + 1;

    const ads = await getConnection()
      .getRepository(Ad)
      .createQueryBuilder()
      .orderBy('"createdAt"')
      .skip(offset)
      .take(limitPlusOne)
      .getMany();

    return {
      ads: ads.slice(0, limit),
      hasMore: ads.length === limitPlusOne,
    };
  }
}
