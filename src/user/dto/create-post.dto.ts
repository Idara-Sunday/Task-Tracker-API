import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class PostDTO {
    @IsString()
    @MinLength(3) 
    @IsNotEmpty()
    title:string;

    @IsString()
    @MinLength(5)
    @IsNotEmpty()
    description:string;
}