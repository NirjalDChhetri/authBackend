import { IsEmail, IsNotEmpty, IsString,Validate, } from "class-validator";
import { IsStrongPassword } from "../customs/passwordStrength";

export class LoginDTO {
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export class ChangePasswordDTO {
  @IsString()
  @IsNotEmpty()
  oldPassword: string;

  @IsString()
  @IsNotEmpty()
  @Validate(IsStrongPassword)
  newPassword: string;

  @IsString()
  @IsNotEmpty()
  confirmPassword: string;
}

export class ForgetPasswordDTO {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}

export class ResetPasswordDTO {
  @IsString()
  @IsNotEmpty()
  token: string;

  @IsString()
  @IsNotEmpty()
  hashedToken: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  confirmPassword: string;
}
