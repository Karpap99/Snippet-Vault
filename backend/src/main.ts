import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['https://snippet-vault-9f26.vercel.app'],
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3100);
}

bootstrap();
