import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  try {
    const app = await NestFactory.create(AppModule);

    app.enableCors();

    const configService = app.get(ConfigService);
    const port = configService.get<number>('PORT', 5002);

    const config = new DocumentBuilder()
      .setTitle('禪心儀表板')
      .setDescription('The API description')
      .setVersion('1.0')
      .addTag('example')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('swagger', app, document);

    console.debug(JSON.stringify(document));

    logger.debug(`✨ listening on port ${port}`);
    await app.listen(port);
  } catch (err) {
    logger.error('Bootstrap failed', err);
    process.exit(1); // 或其他适当的退出码
  }
}
bootstrap();
