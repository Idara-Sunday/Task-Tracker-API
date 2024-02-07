import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PROJECT_PORT;
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true
  }));
  // app.setGlobalPrefix('v1/api');
  await app.listen(port,()=>{
    console.log(`server is listening on port ${port}`);
    
  }); 
}
bootstrap();
