import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';
import { ValidationPipe } from '@nestjs/common';

import metadata from './metadata';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const config = new DocumentBuilder()
    .setTitle('Ticketing API 2025')
    .setVersion('1.0')
    .addTag('tickets')
    .build();

  await SwaggerModule.loadPluginMetadata(metadata);

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  app.use(
    '/scalar',
    apiReference({
      spec: {
        content: documentFactory,
      },
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
