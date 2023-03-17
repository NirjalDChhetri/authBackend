import { Request, Response, NextFunction } from "express";
import HttpException from "../utils/HttpException";
import Message from "../customs/messages";
import { JwtUtil } from "../utils/jwt.util";
import "dotenv/config";
import { AppDataSource } from "../config/database.config";
import { User } from "../entity/user.entity";

 const authentication = async (
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
    throw HttpException.unauthorized(Message["unAuthorized"]);
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
    req.user = user;
    next();
    
  } catch (error) {
    next(error);
  }
};

export default authentication