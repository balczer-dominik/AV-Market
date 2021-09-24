import { createWriteStream, unlink } from "fs";
import randomstring from "randomstring";
import { Upload } from "../util/type-graphql/Upload";
import { GraphQLUpload } from "apollo-server-express";
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
import {
  AD_NOT_FOUND,
  MainCategory,
  UNAUTHORIZED,
  Wear,
} from "../resource/strings";
import { MyContext } from "../types";
import { errorResponse } from "../util/errorResponse";
import { AdResponse } from "../util/type-graphql/AdResponse";
import { AdSearch } from "../util/type-graphql/AdSearch";
import { AdSortingOptions } from "../util/type-graphql/AdSortingOptions";
import { PaginatedAds } from "../util/type-graphql/PaginatedAds";
import { PostInput } from "../util/type-graphql/PostInput";
import { validatePost } from "../validators/validatePost";
import { Feedback } from "../entities/Feedback";

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
    @Arg("dateCursor", () => String, { nullable: true })
    dateCursor: string | null,
    @Arg("priceCursor", () => String, { nullable: true })
    priceCursor: string | null
  ): Promise<PaginatedAds> {
    const limitPlusOne = first + 1;

    //Filters
    const filters = [
      { value: title, filter: '"Ad"."title" LIKE :title' },
      { value: wear, filter: '"Ad"."wear" = :wear' },
      { value: category, filter: '"Ad"."category" = :category' },
      { value: subcategory, filter: '"Ad"."subCategory" = :subcategory' },
      { value: priceLower, filter: '"Ad"."price" >= :priceLower' },
      { value: priceUpper, filter: '"Ad"."price" <= :priceUpper' },
      { value: county, filter: "county = :county" },
      { value: city, filter: "city LIKE :city" },
    ];

    let filterString = "";

    //Building filter string
    filters.forEach(({ value, filter }) => {
      if (value) {
        filterString +=
          filterString.length !== 0 && !filterString.endsWith("AND ")
            ? " AND "
            : "";
        filterString += filter;
      }
    });

    //Adding cursors
    if (priceCursor) {
      filterString +=
        filterString.length !== 0 && !filterString.endsWith("AND ")
          ? " AND "
          : "";
      filterString += `"Ad"."price" ${
        order === "ASC" ? ">" : "<"
      } :priceCursor OR ("Ad"."price" = :priceCursor AND "Ad"."createdAt" ${
        order === "ASC" ? ">" : "<"
      } :dateCursor)`;
    } else if (dateCursor) {
      filterString +=
        filterString.length !== 0 && !filterString.endsWith("AND ")
          ? " AND "
          : "";
      filterString += `"Ad"."createdAt" ${
        order === "ASC" ? ">" : "<"
      } :dateCursor`;
    }

    const ads = await getConnection()
      .getRepository(Ad)
      .createQueryBuilder()
      .innerJoin(`Ad.owner`, "owner")
      .where(filterString, {
        title: `%${title}%`,
        wear: wear,
        category: category,
        subcategory: subcategory,
        priceLower: priceLower,
        priceUpper: priceUpper,
        county: county,
        city: `%${city}%`,
        dateCursor: dateCursor ? new Date(parseInt(dateCursor)) : null,
        priceCursor: parseInt(priceCursor ?? "0"),
      })
      .limit(limitPlusOne)
      .addOrderBy(`"Ad_${sortBy.valueOf()}"`, order)
      .addOrderBy('"Ad_createdAt"', order)
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

  @UseMiddleware(isAuth)
  @Mutation(() => AdResponse)
  async editAd(
    @Arg("adId", () => Int) adId: number,
    @Arg("options", () => PostInput)
    { category, price, desc, subCategory, title, wear }: PostInput,
    @Ctx() { req }: MyContext
  ) {
    //Fetching
    const ad = await Ad.findOne(adId);
    if (!ad) {
      return errorResponse("ad", AD_NOT_FOUND);
    }

    //Authorization
    if (req.session.userId !== ad.ownerId) {
      return errorResponse("ad", UNAUTHORIZED);
    }

    //Validation
    const errors = validatePost(title, price);
    if (errors) {
      return { errors };
    }

    //Updating
    ad.category = category ?? ad.category;
    ad.subCategory = subCategory ?? ad.subCategory;
    ad.title = title ?? ad.title;
    ad.price = price ?? ad.price;
    ad.desc = desc ?? "";
    ad.wear = wear ?? ad.wear;
    ad.save();

    return { ad };
  }

  @UseMiddleware(isAuth)
  @Mutation(() => Boolean)
  async deleteAd(
    @Arg("adId", () => Int) adId: number,
    @Ctx() { req }: MyContext
  ) {
    //Fetching
    const ad = await Ad.findOne(adId);
    if (!ad) {
      return false;
    }

    //Authorization
    if (req.session.userId !== ad.ownerId) {
      return false;
    }

    const images = await AdImage.find({ adId: ad.id });
    await Feedback.delete({adId: ad.id});

    if (images) {
      images.forEach(async (image) => {
        unlink(__dirname + `/../../../web/public/ad/${image}.png`, (err) => {
          console.log(err);
        });
        image.remove();
      });
    }

    ad.remove();

    return true;
  }

  @UseMiddleware(isAuth)
  @Mutation(() => Boolean)
  async deleteAdImage(
    @Arg("src", () => String) src: string,
    @Ctx() { req }: MyContext
  ) {
    //Fetching
    const image = await AdImage.findOne({ where: { src } });
    if (!image) {
      return false;
    }

    const ad = await Ad.findOne(image.adId);

    if (!ad) {
      return false;
    }

    //Authorization
    if (req.session.userId !== ad.ownerId) {
      return false;
    }

    unlink(__dirname + `/../../../web/public/ad/${src}.png`, (err) => {
      if (err) console.log(err);
    });

    image.remove();

    return true;
  }

  @UseMiddleware(isAuth)
  @Mutation(() => [String])
  async uploadAdImages(
    @Arg("images", () => [GraphQLUpload])
    images: [Upload],
    @Arg("adId", () => Int) adId: number,
    @Ctx() { req }: MyContext
  ) {
    const ad = await Ad.findOne(adId);

    if (!ad) {
      return [];
    }

    if (ad.ownerId !== req.session.userId) {
      return [];
    }

    let result: string[] = [];

    images.forEach(async (image) => {
      const filename = randomstring.generate(30);
      result.push(filename);
      const { createReadStream } = await image;
      await new Promise(
        async (resolve, reject) =>
          await createReadStream()
            .pipe(
              createWriteStream(
                __dirname + `/../../../web/public/ad/${filename}.png`
              )
            )
            .on("finish", async () => {
              await AdImage.insert({ ad: ad, adId: ad.id, src: filename });
              resolve(true);
            })
            .on("error", (err) => {
              console.log(err);
              reject(false);
            })
      );
    });

    return result;
  }
}
