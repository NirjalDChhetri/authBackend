import { IsNotEmpty, IsEmail } from "class-validator"

export class ContactDTO {
    @IsNotEmpty()
    name: string
  
    @IsNotEmpty()
    @IsEmail()
    email: string
  
    @IsNotEmpty()
    phoneNumber: string
  
    @IsNotEmpty()
    message: string
  }
  