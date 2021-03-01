import { User } from "../entities/User";
import { MyContext } from "../types";
import { MiddlewareFn } from "type-graphql";

export const isAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
  if (!context.req.session.userId) {
    throw new Error("Not authenticated.");
  }

  User.findOne(context.req.session.userId).then((user) => {
    if (user?.banned) {
      throw new Error("Account terminated.");
    }
  });

  return next();
};

export const isAdmin: MiddlewareFn<MyContext> = ({ context }, next) => {
  if (!context.req.session.userId) {
    throw new Error("Not authenticated.");
  }

  if (context.req.session.userId !== 15) {
    throw new Error("Access denied.");
  }

  return next();
};
