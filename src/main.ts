import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SwaggerTheme, SwaggerThemeNameEnum } from 'swagger-themes';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: '*',
  });
  const config = new DocumentBuilder()
    .setTitle('Talent Hunters Book Portal')
    // .setDescription(
    //   '<b> Mobile User </b>: Valid for only Mobile Users  \n <b> Admin </b>: Valid for only Admin ',
    // )
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'jwt',
    )
    .build();
  const theme = new SwaggerTheme();
  // theme.getBuffer(SwaggerThemeNameEnum.DARK);
  const themeOptions = {
    customCss: theme.getBuffer(SwaggerThemeNameEnum.CLASSIC),
  };
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document, {
    ...themeOptions,
    swaggerOptions: {
      persistAuthorization: true, // This will persist the Bearer token on refresh
    },
  });

  const configService = app.get(ConfigService);
  const port = configService.get<number>('app.port');

  await app.listen(port);
  Logger.log(`🚀 Server is up and running on port ${port}`, 'Bootstrap');
}
bootstrap();
