import { Entity, Column, BeforeInsert, OneToMany } from "typeorm";
import { Role, TokenStatus } from "../constants/enum";
import BcryptUtils from "../utils/bcrypt.util";
import { CommonField } from "./commonEntity";
import Token from "./token.entity";

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

  @OneToMany(() => Token, (token) => token.user, {
    nullable: true,
    onDelete: 'CASCADE'
  })
  token: Token[]

  @BeforeInsert()
  async hashedPassword(){
    this.password = await BcryptUtils.hash(this.password)
  }
}
