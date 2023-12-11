import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUser } from './dto/login-user.dto';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async registerUser(@Body() payload:CreateUserDto){
    return await this.userService.signUp(payload)
  }

  @Post('login')
  async loginUser(@Body() payload:LoginUser){
    return await this.userService.logIn(payload)
  }

  @Post('createtask')
  async createTask(payload:CreateTaskDto){
    return await this.userService.createTask(payload)
  }
  
}
