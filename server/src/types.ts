import { Response } from "express";
import { Session, SessionData } from "express-session";
import { Redis } from "ioredis";
import { ExecutionParams } from "subscriptions-transport-ws";

export type MyContext = {
  req: Request & {
    session: Session & Partial<SessionData> & { userId?: number };
  };
  redis: Redis;
  res: Response;
  connection: ExecutionParams<any> | undefined;
};
