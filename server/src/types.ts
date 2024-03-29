import { Response } from "express";
import { Session, SessionData } from "express-session";
import { Redis } from "ioredis";
import { Message } from "./entities/Message";

export type MyContext = {
  req: Request & {
    session: Session & Partial<SessionData> & { userId?: number };
  };
  redis: Redis;
  res: Response;
};

export type MessagePayload = {
  message: Message;
  recipientIds: number[];
};
