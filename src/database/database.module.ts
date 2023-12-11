import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports:[TypeOrmModule.forRootAsync({
        useFactory:(ConfigService:ConfigService) => ({
            type:'mysql',
            port:ConfigService.getOrThrow('DB_PORT'),
            synchronize:ConfigService.getOrThrow('DB_SYNCHRONIZE'),
            password:ConfigService.getOrThrow('DB_PASSWORD'),
            host:ConfigService.getOrThrow('DB_HOST'),
            username:ConfigService.getOrThrow('DB_USER'),
            database:ConfigService.getOrThrow('DB_NAME'),
            autoLoadEntities:true
        }),
        inject:[ConfigService]
    })]
})
export class DatabaseModule {}
