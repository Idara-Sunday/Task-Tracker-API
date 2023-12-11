import { IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class CreateTaskDto {
  

    @IsNotEmpty()
    @IsString()
    task_status:string

    @IsNotEmpty()
    @IsString()
    task_title:string;

    @IsNotEmpty()
    @IsString()
    task_description:string;
}
