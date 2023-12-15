import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UserProfileDTO {
    @IsNotEmpty()
    @IsString()
    firstName:string;

    @IsNotEmpty()
    @IsString()
    lastName:string;

    @IsNotEmpty()
    @IsNumber()
    age:number;

    @IsString()
    @IsNotEmpty()
    DOB:string;
}