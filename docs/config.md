1. 安裝 `@nestjs/config` 模組：
```shell
npm install @nestjs/config
```
2. 導入模組 ConfigModule
```ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
})
export class AppModule {}
```
3. 服務或控制器讀取
```ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}

  getHello(): string {
    const dbUser = this.configService.get<string>('DATABASE_USER');
    return dbUser;
  }
}
```

4. `main.ts` 讀取
```ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 5002);
  console.log(`listening on port ${port}`);
  await app.listen(port);
}
bootstrap();
```
[首頁](../README.md)