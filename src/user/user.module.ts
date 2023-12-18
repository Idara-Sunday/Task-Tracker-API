import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { Profile } from './entities/profile';
import { Post } from './entities/posts.entity';
import { Comments } from './entities/comments.entity';

@Module({
  imports:[TypeOrmModule.forFeature([User,Profile,Post,Comments]),
  JwtModule.registerAsync({
    inject:[ConfigService],
    useFactory:(ConfigService:ConfigService) => ({
      global:true,
      secret:ConfigService.getOrThrow<string>('JWT_SECRET'),
      signOptions:{
        expiresIn:ConfigService.getOrThrow<string>('JWT_EXPIRESIN'),
        algorithm:ConfigService.getOrThrow('JWT_ALGORITHM')
      }
    })
  }),
  PassportModule.register({
    defaultStrategy:'jwt'
  })
],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
