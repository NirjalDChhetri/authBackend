import { Entity, Column, BeforeInsert, OneToMany } from "typeorm";
import { Role, TokenStatus } from "../constants/enum";
import BcryptUtils from "../utils/bcrypt.util";
import { CommonField } from "./commonEntity";
import Token from "./token.entity";
import { Otp } from "./otp.entity";

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

  //To verify user gmail
  @Column({
    default: false,
    name: 'is_verified',
    nullable: true
  })
  isVerified: Boolean

  @OneToMany(() => Token, (token) => token.user, {
    nullable: true,
    onDelete: 'CASCADE'
  })
  token: Token[]

  @OneToMany(() => Otp, (otp) => otp.user)
  otp: Otp[]

  @BeforeInsert()
  async hashedPassword(){
    this.password = await BcryptUtils.hash(this.password)
  }
}
