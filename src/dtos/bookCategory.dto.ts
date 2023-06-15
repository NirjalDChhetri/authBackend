import { IsNotEmpty, IsString } from "class-validator";


export class CategoryDTO {
    @IsString()
    @IsNotEmpty()
    title: string
}