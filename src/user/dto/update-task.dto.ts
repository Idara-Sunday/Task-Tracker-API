import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateTaskDto } from './create-task.dto';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
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
