import { Exclude } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Post } from "../entities/posts.entity";
import { Profile } from "../entities/profile.entity";

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



export class SerializedUserProfile{
    @Exclude()
    created_At:Date;
  
    @Exclude()
    updated_At:Date;
  
    @Exclude()
    id:number;
  
    email:string;
  
    @Exclude()
    password:string;
  
    post:Post[];
  
    profile:Profile;
  
  
  
    constructor(partial:Partial<SerializedUserProfile>){
      Object.assign(this,partial)
    }
  }