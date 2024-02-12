import { IsNotEmpty, IsString } from "class-validator";

export class UpdateUserProfile {
    @IsNotEmpty()
    @IsString()
    firstName:string;

    @IsNotEmpty()
    @IsString()
    lastName:string;
}