import { IsNotEmpty, IsString } from "class-validator";

export class UpdateUserProfileDTO {
    @IsNotEmpty()
    @IsString()
    firstName:string;

    @IsNotEmpty()
    @IsString()
    lastName:string;
}