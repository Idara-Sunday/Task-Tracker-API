import { Exclude } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @IsEmail()
    @IsString()
    email:string;


    @IsNotEmpty()
    @IsString()
    @IsStrongPassword()
    password:string;

}

export class SerializedUser {
    @Exclude()
    id:number;

    @Exclude()
    created_At:Date;

    @Exclude()
    updated_At:Date;

    @Exclude()
    password:string;

    constructor(partial:Partial<SerializedUser>){
        Object.assign(this,partial)
    }
}