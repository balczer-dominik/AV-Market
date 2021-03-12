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
import { AD_NOT_FOUND, MainCategory, Wear } from "../resource/strings";
import { User } from "../entities/User";
import { getConnection, Not } from "typeorm";
import { PaginatedAds } from "../util/type-graphql/PaginatedAds";
import { errorResponse } from "../util/errorResponse";
import randomstring from "randomstring";
import { createWriteStream } from "fs";
import { AdImage } from "../entities/AdImage";

@Resolver(Ad)
export class AdResolver {
  //Tulajdonos
  @FieldResolver(() => User)
  async owner(@Root() ad: Ad) {
    return await User.findOne(ad.ownerId);
  }

  @FieldResolver(() => [String])
  async images(@Root() ad: Ad) {
    return (await AdImage.find({ where: { adId: ad.id } })).map((ai) => ai.src);
  }

  @FieldResolver(() => String, { nullable: true })
  async thumbnail(@Root() ad: Ad) {
    return (await AdImage.findOne({ where: { adId: ad.id } }))?.src;
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

  @Query(() => AdResponse)
  async ad(@Arg("id", () => Int) id: number): Promise<AdResponse> {
    const ad = await Ad.findOne(id);

    if (!ad) {
      return errorResponse("id", AD_NOT_FOUND);
    }

    return { ad };
  }
}
