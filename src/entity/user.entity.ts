import { Entity, Column, BeforeInsert } from "typeorm";
import { Role } from "../constants/enum";
import BcryptUtils from "../utils/bcrypt.util";
import { CommonField } from "./commonEntity";

@Entity({
  name: "user",
})
export class User extends CommonField {

  @Column({
    select: true
  })
  username: string;

  @Column({
    name: 'email',
    unique: true,
  })
  email: string;

  @Column({
    name: 'password',
    select: false
    })
  password: string;

  @BeforeInsert()
  async hashedPassword(){
    this.password = await BcryptUtils.hash(this.password)
  }
}
