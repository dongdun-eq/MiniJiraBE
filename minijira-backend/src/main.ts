import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './filters/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (errors) => {
        const details = errors.map((error) => ({
          field: error.property,
          message: Object.values(error.constraints || {})[0],
        }));

        return new BadRequestException({
          isValidationError: true,
          details,
        });
      },
    }),
  );

  app.useGlobalFilters(new AllExceptionsFilter());

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Backend')
    .setDescription('Full API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
