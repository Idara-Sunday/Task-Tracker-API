import { ConfigService } from "@nestjs/config"
import { config } from "dotenv"
import { DataSource, DataSourceOptions } from "typeorm"

config()

const configService = new ConfigService()

export const dataSourceOptions:DataSourceOptions = ({
    type:'mysql',
    port:configService.getOrThrow('DB_PORT'),
    password:configService.getOrThrow('DB_PASSWORD'),
    host:configService.getOrThrow('DB_HOST'),
    username:configService.getOrThrow('DB_USER'),
    database:configService.getOrThrow('DB_NAME'),
    synchronize:configService.getOrThrow('DB_SYNCHRONIZE'),
    entities:['dist/**/*.entity.js'],
    migrations:['dist/config/databaseMigration/*.js']
})
 
const dataSource = new DataSource(dataSourceOptions)
export default dataSource;