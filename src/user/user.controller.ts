import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUser } from './dto/login-user.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { SkipThrottle } from '@nestjs/throttler';
import { UserProfileDTO } from './dto/user.profile.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @SkipThrottle()
  @Post('signup')
  async registerUser(@Body() payload:CreateUserDto){
    return await this.userService.signUp(payload)
  }

  @Post('login')
  async loginUser(@Body() payload:LoginUser){
    return await this.userService.logIn(payload)
  }


  @Post(':id/profile')
  async userProfile(@Param('id') id:number, @Body() payload:UserProfileDTO){
    return await this.userService.createProfile(id,payload)
  }
/*
  @Post('createtask')
  async createTask(@Body() payload:CreateTaskDto){
    return await this.userService.createTask(payload)
  }
  */
 @Get()
 async getUsers(){
  return await this.userService.getUsers()
 }
  
}
