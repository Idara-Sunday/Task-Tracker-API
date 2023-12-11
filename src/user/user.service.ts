import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userService:Repository<User>){}
  async signUp(payload:CreateUserDto) {
    // DESTRUCTURING THE INCOMING PAYLOAD
    var {email,password, ...rest} =payload;

     email = email.toLocaleLowerCase();
    
    const checkUser = await this.userService.findOne({where:{email}});

    if (checkUser){
      throw new HttpException('email has been registered with another user',401)
    }

    const hashpassword = await bcrypt.hash(password,34);

   const saveUser = await this.userService.save({
      email,
      password:hashpassword,
      ...rest
    })
    delete saveUser.password

    return {
      saveUser

    }

  }

  findAll() {
    return `This action returns all user`;
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
