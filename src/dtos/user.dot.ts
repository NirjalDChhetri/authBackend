import { IsString, IsNotEmpty, IsEmail, Validate, IsOptional, IsDateString, IsEnum, IsNotEmptyObject, ValidateNested } from "class-validator";
import { IsEmailExist } from "../customs/isEmailExist";
import { IsStrongPassword } from "../customs/passwordStrength";
import { Gender } from "../constants/enum";
import { Type } from "class-transformer";
import { MediaDTO } from "./media.dto";

export class SignupDTO{
    
    @IsNotEmpty()
    @IsString()
    userName: string

    @IsNotEmpty()
    @IsEmail()
    @Validate(IsEmailExist)
    email: string
  
    @IsNotEmpty()
    @Validate(IsStrongPassword)
    password: string

}

export class CreateUserDetailsDTO {
    @IsString()
    @IsNotEmpty()
    firstName: string

    @IsString()
    @IsOptional()
    middleName: string

    @IsString()
    @IsNotEmpty()
    lastName: string

    @IsNotEmpty()
    @IsDateString()
    dateOfBirth: Date

    @IsNotEmpty()
    @IsString()
    address: string

    @IsNotEmpty()
    phoneNumber: string

    @IsNotEmpty()
    @IsEnum(Gender)
    gender: Gender

    @IsNotEmptyObject()
    @ValidateNested()
    @Type(()=> MediaDTO)
    profilePicture: MediaDTO


}