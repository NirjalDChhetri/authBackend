import { IsEmail, IsNotEmpty, IsString, IsNumber, Min, Max, Validate } from 'class-validator';

export class LoginDTO{

    @IsNotEmpty()
    @IsEmail()
    email!: string

    @IsNotEmpty()
    @IsString()
    password: string
}

export class ChangePasswordDTO{
    @IsString()
    @IsNotEmpty()
    oldPassword: string
    
    @IsString()
    @IsNotEmpty()
    newPassword: string

    @IsString()
    @IsNotEmpty()
    confirmPassword: string
}

export class ForgetPasswordDTO{
    @IsNotEmpty()
    @IsNumber()
    @Min(100000)
    @Max(999999)
    code: number

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string
  
    @IsNotEmpty()
    newPassword: string
}