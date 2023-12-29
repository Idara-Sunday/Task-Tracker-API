import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {  User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto, SerializedUser } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { LoginUser } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { CreateTaskDto } from './dto/create-task.dto';
import { createUserParams } from 'src/utils/types';
import {  SerializedUserProfile, UserProfileDTO } from './dto/user.profile.dto';
import { Profile } from './entities/profile.entity';
import { PostDTO } from './dto/create-post.dto';
import { Post } from './entities/posts.entity';
import { Comments } from './entities/comments.entity';
import { CommentDTO } from './dto/comment.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userService: Repository<User>,
    @InjectRepository(Profile) private  userProfile: Repository<Profile>,
    @InjectRepository(Post) private readonly userPost: Repository<Post>,
    @InjectRepository(Comments) private readonly commentRepository:Repository<Comments>,
    private jwtService: JwtService,
  ) {}
  async signUp(payload: CreateUserDto) {
    // DESTRUCTURING THE INCOMING PAYLOAD
    var { email, password, ...rest } = payload;

    email = email.toLocaleLowerCase();

    const checkUser = await this.userService.findOne({ where: { email } });

    if (checkUser) {
      throw new HttpException(
        'email has been registered with another user',
        401,
      );
    }

    const hashpassword = await bcrypt.hash(password, 12);

    const saveUser = await this.userService.save({
      email,
      password: hashpassword,
      ...rest,
    });
    delete saveUser.password;

    return { saveUser };
  }

  // LOGIN  FUNCTIONALITY
  async logIn(payload: LoginUser) {
    const { email, password } = payload;

    const findUser = await this.userService.findOne({ where: { email } });

    if (!findUser) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    const decryptPassword = await bcrypt.compare(password, findUser.password);
    console.log(decryptPassword);

    if (!decryptPassword) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const jwtPayload = {
      userEmail: findUser.email,
    };

    return {
      access_token: await this.jwtService.signAsync(jwtPayload),
    };
  }

  async createProfile(id: any, payload: UserProfileDTO) {
    const User = await this.userService.findOneBy({ id });
    if (!User) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }

    const newProfile = this.userProfile.create(payload);
    const saveProfile = await this.userProfile.save(newProfile);
    User.profile = saveProfile;

    const updateUser = await this.userService.save(User);
    delete updateUser.password;
    return updateUser;
  }

  // FETCHING ALL USERS FROM THE DATABASE
  async getUsers() {

    const findUsers = await this.userService.find();
    // return findUsers.map((users)=>plainToClass(SerializedUser,users)) || This method is not a standard way of SERIALIZING data

    return findUsers.map((users)=> new SerializedUser(users)) // this is the standard method of SERIALIZING data
    
    // return await this.userService.find()
    // return await this.userService.find({ relations: ['profile','post'] });
  }


  async getUserbyId(id:number){

    const findUser = await this.userService.findOneBy({id});

    if(!findUser){
      throw new HttpException('User not found',HttpStatus.NOT_FOUND)
    }
    return new SerializedUser(findUser)


  }


  //  CREATING A POST
  async createPost(id: number, payload:PostDTO) {
    const findUser = await this.userService.findOneBy({ id });
 
    if (!findUser) {
      throw new HttpException('user not found', HttpStatus.BAD_REQUEST);
    }
     
    const makePost = this.userPost.create({
      ...payload,
      user:{id} 
    });

    return this.userPost.save(makePost)
    // const makePost =  this.userPost.create(payload);
    // const savePost = await this.userPost.save(makePost);
    // findUser.posts = savePost;

    // const updateUser = this.userService.save(findUser)

    // return await this.userService.save(findUser)
  }

  // CREATING COMMENTS

  async createComment( id:number,payload:CommentDTO){
    const userpost = await this.userPost.findOneBy({id});
    
    if(!userpost){
      throw new NotFoundException('Post Not found')
    }
    const makeComment = this.commentRepository.create({
      ...payload,
    })

    const saveComment = await this.commentRepository.save(makeComment)
     userpost.comment =[saveComment]

    
   
    return await this.userPost.save(userpost)
  }
  

  async deleteUser(id:number){
    const user = await this.userService.findOneBy({id});

    if(!user){
      throw new HttpException('user not found',HttpStatus.NOT_FOUND);
    }

   return  this.userService.delete(id);
   
   
  } 

  async getUserByFirstName(firstName:string) :Promise<User | undefined>{
    const user = await this.userService.createQueryBuilder('user')
    .innerJoinAndSelect('user.profile','profile')
    .where('profile.firstName = :firstName',{firstName})
    .getOne()

    if (!user){
    throw new HttpException('User Ibaha ooh',401)
    }

    const serialUSer = new SerializedUserProfile(user)
    return serialUSer
    // const user= await this.userService.

    

    // try {
    //   const user = await this.userService.createQueryBuilder('user').leftJoinAndSelect('user.profile','profile').where('profile.firstName = :firstName',{firstName}).getOneOrFail();

    // if (!user){
    //   throw new HttpException('User No dey ooh',401)
    // }
    // return user
    // } catch (error) {
    //   return error
    // }
  }

}

/* 
// auth.guard.ts

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.get<boolean>(
      'isPublic',
      context.getHandler(),
    );

    if (isPublic) {
      return true; // If the route is marked as public, allow access without authentication
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractJwtFromRequest(request);

    if (!token) {
      return false; // No token provided, deny access
    }

    try {
      const decoded = this.jwtService.verify(token);
      request.user = decoded;
      return true; // Authentication successful
    } catch (error) {
      return false; // Invalid token, deny access
    }
  }

  private extractJwtFromRequest(request): string {
    // Extract JWT token from the Authorization header
    const authHeader = request.headers.authorization;
    if (authHeader && authHeader.split(' ')[0] === 'Bearer') {
      return authHeader.split(' ')[1];
    }
    return null;
  }
}
*/
