import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerTheme, SwaggerThemeNameEnum } from 'swagger-themes';
import * as compression from 'compression';
import { urlencoded, json } from 'express';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
//import { createAsyncapiDocs } from './async-api';

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
    customCss: theme.getBuffer(SwaggerThemeNameEnum.ONE_DARK),
  };
  /* if (process.env.NEST_BACKEND_ENVIRONMENT == 'dev')*/
  SwaggerModule.setup('documentation', app, document, options);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  //  await createAsyncapiDocs(app);
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ limit: '50mb', extended: true }));
  app.use(compression());
  const corsOptions: CorsOptions = {
    origin: '*', //['http://localhost:5173', 'https://tuksui.sharpsoftwaresolutions.net/'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  };
  app.enableCors(corsOptions);
  await app.listen(3000);
}
bootstrap();
