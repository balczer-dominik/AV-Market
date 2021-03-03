import { AdResponse } from "../util/type-graphql/AdResponse";
import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { isAuth } from "../middleware/authMiddleware";
import { PostInput } from "../util/type-graphql/PostInput";
import { MyContext } from "../types";
import { validatePost } from "../validators/validatePost";
import { Ad } from "../entities/Ad";
import { MainCategory, Wear } from "../resource/strings";
import { User } from "../entities/User";
import { getConnection } from "typeorm";

@Resolver(Ad)
export class AdResolver {
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

    const owner = await User.findOne(req.session.userId);

    const partialAd: Partial<Ad> = {
      category: category as MainCategory,
      location: "Budapest",
      subCategory: subCategory,
      title: title,
      price: price,
      wear: wear as Wear,
      owner: owner!,
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

    return {
      ad: {
        owner: owner as User,
        ...(ad as Omit<Ad, "owner">),
      },
    };
  }
}
