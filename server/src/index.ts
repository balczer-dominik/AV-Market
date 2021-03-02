import { ApolloServer } from "apollo-server-express";
import connectRedis from "connect-redis";
import cors from "cors";
import express from "express";
import session from "express-session";
import Redis from "ioredis";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { COOKIE_NAME, __prod__ } from "./constants";
import { User } from "./entities/User";
import { HelloResolver } from "./resolvers/hello";
import { UserResolver } from "./resolvers/user";
import { UserAdministrationResolver } from "./resolvers/userAdministration";

const main = async () => {
  //TypeORM
  await createConnection({
    type: "postgres",
    database: "avmarket",
    username: "postgres",
    password: "postgres",
    logging: true,
    synchronize: !__prod__,
    entities: [User],
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

  //Apollo
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, UserResolver, UserAdministrationResolver],
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

  //Hello world
  app.get("/", (_, res) => {
    res.send("Hello world!");
  });

  app.listen(4000, () => {
    console.log("Server started on localhost:4000");
  });
};

main();
