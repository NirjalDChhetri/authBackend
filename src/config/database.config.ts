import "reflect-metadata";
import { DataSource } from "typeorm";
import "dotenv/config";
import { User } from "../entity/user.entity";
import Token from "../entity/token.entity";
import { Otp } from "../entity/otp.entity";
import { Media } from "../entity/media.entity";
import { BookCategory } from "../entity/bookCategory.entity";
import { UserDetails } from "../entity/user.detail.entity";
import { Book } from "../entity/book.entity";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT! || 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User, Token, Otp, Media, BookCategory, UserDetails, Book],
  synchronize: true,
  logging: false,
  //dropSchema: true,
});
