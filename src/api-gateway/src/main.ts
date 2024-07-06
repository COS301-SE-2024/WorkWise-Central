import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerTheme, SwaggerThemeNameEnum } from 'swagger-themes';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('API-GATEWAY')
    .setDescription('Documentation of the WorkWise API-GATEWAY')
    .setVersion('1.3')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  const theme = new SwaggerTheme();
  const options = {
    explorer: true,
    customCss: theme.getBuffer(SwaggerThemeNameEnum.ONE_DARK),
  };
  SwaggerModule.setup('documentation', app, document, options);
  app.useGlobalPipes(
    new ValidationPipe({
      //stopAtFirstError: true,
      //transform: true,
      whitelist: true,
    }),
  );
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
