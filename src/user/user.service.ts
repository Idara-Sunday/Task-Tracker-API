import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { LoginUser } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userService: Repository<User>, private jwtService:JwtService
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
    const { email, password} = payload;

    const findUser = await this.userService.findOne({ where: { email } });

    if(!findUser){
      throw new UnauthorizedException('Invalid Credentials')
    }
     
    const decryptPassword = await bcrypt.compare(password,findUser.password)
    console.log(decryptPassword);
    

    if (!decryptPassword) {
      throw new UnauthorizedException('Invalid credentials');
    }
 

    const jwtPayload = {
      userEmail:findUser.email,
      userFirstName:findUser.firstName,
      userLastName:findUser.lastName,
    }

    return {
      access_token: await this.jwtService.signAsync(jwtPayload)
    }


  }

  //  CREATING TASK

  async createTask(payload:CreateTaskDto){
    return await this.userService.save(payload)
  }

  // FINDING ALL TASK

  findAll() {
    return ;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }
  /*
  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
  */
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