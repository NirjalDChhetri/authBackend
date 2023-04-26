import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { MediaType } from "../constants/enum";

export class MediaDTO {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    mimeType: string

    @IsNotEmpty()
    @IsEnum(MediaType)
    type: MediaType

}