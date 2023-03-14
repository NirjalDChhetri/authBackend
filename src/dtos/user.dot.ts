import { IsString, IsNotEmpty, IsEmail, Min, Validate } from "class-validator";
import { IsEmailExist } from "../customs/isEmailExist";

export class SignupDTO{
    
    @IsNotEmpty()
    @IsString()
    username: string

    @IsNotEmpty()
    @IsEmail()
    @Validate(IsEmailExist)
    email: string
  
    @IsNotEmpty()
    password: string

}