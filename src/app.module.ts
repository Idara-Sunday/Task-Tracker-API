import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';

@Module({
  imports: [UserModule, DatabaseModule,
  ConfigModule.forRoot({
    isGlobal:true
  }),
  ThrottlerModule.forRoot([{
    ttl: 10000,
    limit: 2,
  }])],
  controllers: [],
  providers: [{
    provide: APP_GUARD,
    useClass: ThrottlerGuard
  }
  ],
})
export class AppModule {}
