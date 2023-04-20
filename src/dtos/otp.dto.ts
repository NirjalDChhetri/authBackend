import { IsEmail, IsNotEmpty, IsNumber, IsString, Max, Min, isEmail } from "class-validator";


export class OtpDTO {
    @IsNotEmpty()
    @IsNumber()
    @Min(100000)
    @Max(999999)
    code: number
}

export class ResendOtp {
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string
}