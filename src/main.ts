import { NestFactory } from '@nestjs/core';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });
  app.useWebSocketAdapter(new IoAdapter(app));
  app.enableCors({
    origin: '*',
    credentials: true,
  });
  await app.listen(3000);
}
bootstrap();
