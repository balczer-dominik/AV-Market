import { createWriteStream } from "fs";
import randomstring from "randomstring";
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
import { getConnection, Not } from "typeorm";
import { Ad } from "../entities/Ad";
import { AdImage } from "../entities/AdImage";
import { User } from "../entities/User";
import { isAuth } from "../middleware/authMiddleware";
import { AD_NOT_FOUND, MainCategory, Wear } from "../resource/strings";
import { MyContext } from "../types";
import { errorResponse } from "../util/errorResponse";
import { AdResponse } from "../util/type-graphql/AdResponse";
import { AdSearch } from "../util/type-graphql/AdSearch";
import { PaginatedAds } from "../util/type-graphql/PaginatedAds";
import { PostInput } from "../util/type-graphql/PostInput";
import { validatePost } from "../validators/validatePost";
import { AdSortingOptions } from "../util/type-graphql/AdSortingOptions";
import { formatCursor } from "../util/formatCursor";

@Resolver(Ad)
export class AdResolver {
  //Tulajdonos
  @FieldResolver(() => User)
  async owner(@Root() ad: Ad) {
    return await User.findOne(ad.ownerId);
  }

  @FieldResolver(() => String, { nullable: true })
  async thumbnail(@Root() ad: Ad) {
    return (await AdImage.find({ where: { adId: ad.id } }))[0]?.src;
  }

  @FieldResolver(() => [String], { nullable: true })
  async images(@Root() ad: Ad) {
    return (await AdImage.find({ where: { adId: ad.id } }))?.map(
      (ai) => ai.src
    );
  }

  @FieldResolver(() => [Ad])
  async recent(@Root() ad: Ad) {
    const ads = await Ad.find({
      where: {
        ownerId: ad.ownerId,
        id: Not(ad.id),
      },
      order: {
        featured: "DESC",
        updatedAt: "DESC",
      },
      take: 5,
    });
    return ads;
  }

  //Hirdetés feladás
  @UseMiddleware(isAuth)
  @Mutation(() => AdResponse)
  async post(
    @Arg("options")
    { category, subCategory, title, price, wear, images, desc }: PostInput,
    @Ctx() { req }: MyContext
  ): Promise<AdResponse> {
    const errors = validatePost(title, price);

    if (errors) {
      return { errors };
    }

    const partialAd: Partial<Ad> = {
      category: category as MainCategory,
      subCategory: subCategory,
      title: title,
      price: price,
      desc: desc,
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

    if (images) {
      images.forEach(async (image) => {
        const { createReadStream } = await image;
        const filename = randomstring.generate(30);
        new Promise(
          async (resolve, reject) =>
            await createReadStream()
              .pipe(
                createWriteStream(
                  __dirname + `/../../../web/public/ad/${filename}.png`
                )
              )
              .on("finish", () => {
                AdImage.insert({ ad: ad, adId: ad.id, src: filename });
                resolve(true);
              })
              .on("error", (err) => {
                console.log(err);
                reject(false);
              })
        );
      });
    }

    return { ad };
  }

  //Hirdetések lekérdezése (pagination)
  @Query(() => PaginatedAds)
  async ads(
    @Arg("first", () => Int, { defaultValue: 50 }) first: number,
    @Arg("search", () => AdSearch)
    {
      title,
      wear,
      priceLower,
      priceUpper,
      county,
      city,
      category,
      subcategory,
    }: AdSearch,
    @Arg("sortBy", () => AdSortingOptions)
    { sortBy, order }: AdSortingOptions,
    @Arg("cursor", () => String, { nullable: true }) cursor: string | null
  ): Promise<PaginatedAds> {
    const limitPlusOne = first + 1;

    let filters: String = "";

    //Title
    filters += title ? '"Ad"."title" LIKE :title' : "";

    //Wear
    filters +=
      wear && filters.length !== 0 && !filters.endsWith("AND ") ? " AND " : "";
    filters += wear ? '"Ad"."wear" = :wear' : "";

    //Category
    filters +=
      category && filters.length !== 0 && !filters.endsWith("AND ")
        ? " AND "
        : "";
    filters += category ? '"Ad"."category" = :category' : "";

    //Subcategory
    filters +=
      subcategory && filters.length !== 0 && !filters.endsWith("AND ")
        ? " AND "
        : "";
    filters += subcategory ? '"Ad"."subCategory" = :subcategory' : "";

    //Price (lower)
    filters +=
      priceLower && filters.length !== 0 && !filters.endsWith("AND ")
        ? " AND "
        : "";
    filters += priceLower ? '"Ad"."price" >= :priceLower' : "";

    //Price (upper)
    filters +=
      priceUpper && filters.length !== 0 && !filters.endsWith("AND ")
        ? " AND "
        : "";
    filters += priceUpper ? '"Ad"."price" <= :priceUpper' : "";

    //County
    filters +=
      county && filters.length !== 0 && !filters.endsWith("AND ")
        ? " AND "
        : "";
    filters += county ? "county = :county" : "";

    //City
    filters +=
      city && filters.length !== 0 && !filters.endsWith("AND ") ? " AND " : "";
    filters += city ? "city LIKE :city" : "";

    //Cursor
    filters +=
      cursor && filters.length !== 0 && !filters.endsWith("AND ")
        ? " AND "
        : "";
    filters += cursor
      ? `"Ad"."${sortBy}" ${order === "ASC" ? ">" : "<"} :cursor`
      : "";

    console.log(filters);

    const ads = await getConnection()
      .getRepository(Ad)
      .createQueryBuilder()
      .innerJoin(`Ad.owner`, "owner")
      .where(filters, {
        title: `%${title}%`,
        wear: wear,
        category: category,
        subcategory: subcategory,
        priceLower: priceLower,
        priceUpper: priceUpper,
        county: county,
        city: `%${city}%`,
        cursor: formatCursor(cursor, sortBy),
      })
      .limit(limitPlusOne)
      .orderBy('"Ad_featured"', "DESC")
      .addOrderBy(`"Ad_${sortBy.valueOf()}"`, order)
      .getMany();

    return {
      ads: ads.slice(0, first),
      hasMore: ads.length === limitPlusOne,
    };
  }

  @Query(() => AdResponse)
  async ad(@Arg("id", () => Int) id: number): Promise<AdResponse> {
    const ad = await Ad.findOne(id);

    if (!ad) {
      return errorResponse("id", AD_NOT_FOUND);
    }

    return { ad };
  }
}
