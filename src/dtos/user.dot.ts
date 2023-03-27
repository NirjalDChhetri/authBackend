import { IsString, IsNotEmpty, IsEmail, Validate } from "class-validator";
import { IsEmailExist } from "../customs/isEmailExist";
import { IsStrongPassword } from "../customs/passwordStrength";

export class SignupDTO{
    
    @IsNotEmpty()
    @IsString()
    username: string

    @IsNotEmpty()
    @IsEmail()
    @Validate(IsEmailExist)
    email: string
  
    @IsNotEmpty()
    @Validate(IsStrongPassword)
    password: string

}