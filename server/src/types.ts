import { Session, SessionData } from "express-session";
import { Redis } from "ioredis";
import { Response } from "express";

export type MyContext = {
  req: Request & {
    session: Session & Partial<SessionData> & { userId?: number };
  };
  redis: Redis;
  res: Response;
};
