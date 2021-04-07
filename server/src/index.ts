import { ApolloServer } from "apollo-server-express";
import connectRedis from "connect-redis";
import cors from "cors";
import express from "express";
import session from "express-session";
import { execute, subscribe } from "graphql";
import { createServer } from "http";
import Redis from "ioredis";
import { SubscriptionServer } from "subscriptions-transport-ws";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { COOKIE_NAME, __prod__ } from "./constants";
import { Ad } from "./entities/Ad";
import { AdImage } from "./entities/AdImage";
import { Conversation } from "./entities/Conversation";
import { Feedback } from "./entities/Feedback";
import { Message } from "./entities/Message";
import { User } from "./entities/User";
import { AdResolver } from "./resolvers/ad";
import { ConversationResolver } from "./resolvers/conversation";
import { FeedbackResolver } from "./resolvers/feedback";
import { HelloResolver } from "./resolvers/hello";
import { MessageResolver } from "./resolvers/message";
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
    entities: [User, Ad, AdImage, Feedback, Message, Conversation],
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
  const RedisStore = connectRedis(session); //Store
  const redis = new Redis(); //Client

  //Session
  const sessionMiddleware = session({
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
  });

  app.use(sessionMiddleware);

  //ENUMs
  registerAdSortingEnums();

  //Schema
  const schema = await buildSchema({
    resolvers: [
      HelloResolver,
      UserResolver,
      UserAdministrationResolver,
      AdResolver,
      FeedbackResolver,
      MessageResolver,
      ConversationResolver,
    ],
    validate: false,
  });

  //Apollo
  const apolloServer = new ApolloServer({
    schema: schema,
    context: ({ req, res, connection }) => ({
      connection,
      req,
      res,
      redis,
    }),
  });

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  //Subscriptions
  const wsServer = createServer(app);
  wsServer.listen(4000, () => {
    new SubscriptionServer(
      {
        execute,
        subscribe,
        schema,
        onConnect: (_: any, thisContext: any) => {
          return new Promise((res) =>
            sessionMiddleware(thisContext.upgradeReq, {} as any, () => {
              res({ req: thisContext.upgradeReq });
            })
          );
        },
      },
      { server: wsServer }
    );
    console.log("WS Server started on localhost:4000");
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

  // app.listen(4000, () => {
  //   console.log("Server started on localhost:4000");
  // });
};

main();
