import { IsNotEmpty, IsNumber, Max, Min } from "class-validator";


export class FailedOtpDTO {
    @IsNotEmpty()
    @IsNumber()
    @Min(100000)
    @Max(999999)
    code: number

    @IsNotEmpty()
    user: string

    @IsNotEmpty()
    expiresIn: Date
}