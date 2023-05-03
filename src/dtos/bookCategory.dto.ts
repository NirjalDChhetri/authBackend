import { IsNotEmpty, IsString } from "class-validator";


export class CreateCategoryDTO {
    @IsString()
    @IsNotEmpty()
    title: string
}