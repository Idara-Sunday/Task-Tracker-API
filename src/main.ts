import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PROJECT_PORT;
  await app.listen(port,()=>{
    `server is listening on port ${port}`
  });
}
bootstrap();
