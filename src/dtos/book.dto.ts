import { IsArray, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { MediaDTO } from "./media.dto";

export class CreateBookDTO {

    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsString()
    author: string

    @IsNotEmpty()
    @IsString()
    description: string

    @IsNotEmpty()   
    @IsString() 
    genre: string[]

    @IsNotEmpty()
    categories: string[]

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => MediaDTO)
    images: MediaDTO[]
                

}