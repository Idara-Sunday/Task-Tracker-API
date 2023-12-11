import { IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class LoginUser {
    @IsNotEmpty()
    @IsString()
    email:string;

    @IsNotEmpty()
    @IsString()
    @IsStrongPassword()
    password:string;

}