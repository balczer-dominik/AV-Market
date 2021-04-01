import { ApolloServer } from "apollo-server-express";
import connectRedis from "connect-redis";
import cors from "cors";
import express from "express";
import session from "express-session";
import Redis from "ioredis";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { COOKIE_NAME, __prod__ } from "./constants";
import { Ad } from "./entities/Ad";
import { AdImage } from "./entities/AdImage";
import { Feedback } from "./entities/Feedback";
import { User } from "./entities/User";
import { AdResolver } from "./resolvers/ad";
import { FeedbackResolver } from "./resolvers/feedback";
import { HelloResolver } from "./resolvers/hello";
import { UserResolver } from "./resolvers/user";
import { UserAdministrationResolver } from "./resolvers/userAdministration";
import { registerAdSortingEnums } from "./util/type-graphql/AdSortingOptions";

const main = async () => {
  //TypeORM
  await createConnection({
    type: "postgres",
    database: "avmarket",
    username: "postgres",
    password: "postgres",
    logging: true,
    synchronize: !__prod__,
    entities: [User, Ad, AdImage, Feedback],
  });

  //Express
  const app = express();
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );

  //Redis
  const RedisStore = connectRedis(session);
  const redis = new Redis();

  //Session
  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
        httpOnly: true,
        sameSite: "lax",
        secure: __prod__,
      },
      secret: "55555555555fffffffffff",
      resave: false,
      saveUninitialized: false,
    })
  );

  //ENUMs
  registerAdSortingEnums();

  //Apollo
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        HelloResolver,
        UserResolver,
        UserAdministrationResolver,
        AdResolver,
        FeedbackResolver,
      ],
      validate: false,
    }),
    context: ({ req, res }) => ({
      req,
      res,
      redis,
    }),
  });

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  // mockData.forEach(
  //   async ({
  //     id,
  //     banned,
  //     county,
  //     createdAt,
  //     updatedAt,
  //     email,
  //     messenger,
  //     password,
  //     phone,
  //     username,
  //   }) => {
  //     const hashed = await argon2.hash(password);
  //     User.insert({
  //       id,
  //       createdAt: new Date(parseInt(createdAt)),
  //       updatedAt: new Date(parseInt(updatedAt)),
  //       avatar: undefined,
  //       banned,
  //       city: undefined,
  //       county,
  //       email,
  //       messenger: messenger ?? undefined,
  //       password: hashed,
  //       phone: phone ?? undefined,
  //       username,
  //     });
  //   }
  // );

  // mockData.forEach(
  //   ({
  //     wear,
  //     updatedAt,
  //     createdAt,
  //     title,
  //     subCategory,
  //     price,
  //     ownerId,
  //     featured,
  //     desc,
  //     category,
  //   }) => {
  //     Ad.insert({
  //       wear,
  //       createdAt: new Date(parseInt(createdAt)),
  //       updatedAt: new Date(parseInt(updatedAt)),
  //       title,
  //       subCategory,
  //       price,
  //       ownerId,
  //       featured,
  //       desc: undefined,
  //       category,
  //     });
  //   }
  // );

  app.listen(4000, () => {
    console.log("Server started on localhost:4000");
  });
};

main();
