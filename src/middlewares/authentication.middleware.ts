import { Request, Response, NextFunction } from "express";
import HttpException from "../utils/HttpException";
import Message from "../customs/messages";
import { JwtUtil } from "../utils/jwt.util";
import "dotenv/config";
import { AppDataSource } from "../config/database.config";
import { User } from "../entity/user.entity";

const authenticationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];
  if (!token) {
    return next(HttpException.badRequest(Message["unAuthorized"]));
  }
  let payload = JwtUtil.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET as string
  );
  if (!payload) {
    new Error("You are not authorized");
  }
  let userRepository = AppDataSource.getRepository(User);
  try {
    const user = await userRepository.findOne({
      where: {
        id: payload?.id,
      },
    });
    if (!user) {
      throw HttpException.badRequest(Message["unAuthorized"]);
    }
    req.user = user as User;
    next();
  } catch (error) {
    next(error);
  }
};
