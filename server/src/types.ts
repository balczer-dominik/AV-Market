import { Response } from "express";
import { Session, SessionData } from "express-session";
import { Redis } from "ioredis";
import node_geocoder from "node-geocoder";
import { Message } from "./entities/Message";

export type MyContext = {
  req: Request & {
    session: Session & Partial<SessionData> & { userId?: number };
  };
  redis: Redis;
  res: Response;
  geocoder: node_geocoder.Geocoder;
};

export type MessagePayload = {
  message: Message;
  recipientIds: number[];
};
