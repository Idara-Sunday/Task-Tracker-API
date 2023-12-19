import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUser } from './dto/login-user.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { SkipThrottle } from '@nestjs/throttler';
import { UserProfileDTO } from './dto/user.profile.dto';
import { PostDTO } from './dto/create-post.dto';
import { CommentDTO } from './dto/comment.dto';

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

 @Post(':id/posts')
 async makePost(@Param('id') id:number, @Body() payload:PostDTO){
  return await this.userService.createPost( id,payload)
 }

 @Post(':id/comment')
 async makeCOmment(@Param('id') id:number,@Body() payload:CommentDTO){
  return await this.userService.createComment(id,payload)
 }
  
}
