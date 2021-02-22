import { ApolloServer } from "apollo-server-express";
import connectRedis from "connect-redis";
import cors from "cors";
import Redis from "ioredis";
import express from "express";
import session from "express-session";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { __prod__ } from "./constants";
import { User } from "./entities/User";
import { HelloResolver } from "./resolvers/hello";
import { UserResolver } from "./resolvers/user";

const main = async () => {
  //TypeORM
  const conn = await createConnection({
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
      store: new RedisSto
    })
  )

  //Apollo
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({
      req,
      res,
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
