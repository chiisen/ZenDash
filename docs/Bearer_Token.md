1. 安裝套件:
```shell
npm install --save @nestjs/passport passport passport-http-bearer
npm install --save-dev @types/passport-http-bearer
```

2. 建立 `http.strategy.ts` 策略驗證 Bearer Token：
```ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-http-bearer';

@Injectable()
export class HttpStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super();
  }

  async validate(token: string) {
    // 在這裡驗證您的 token
    // 如果 token 是有效的，則返回 token 的使用者
    // 如果 token 是無效的，則拋出一個異常
  }
}
```

3. 模組 `app.module.ts` 導入 PassportModule 和策略：
```ts
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { HttpStrategy } from './http.strategy';

@Module({
  imports: [PassportModule],
  providers: [HttpStrategy],
})
export class AppModule {}
```

4. 控制器中使用 `@UseGuards` 裝飾器來啟用您的策略：
```ts
import { Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('/api/member')
export class MemberController {
  constructor() {}

  @UseGuards(AuthGuard('bearer'))
  @Post('login')
  getHello(): string {
    return 'hello';
  }
}
```
在這個範例中，當您訪問 `/api/member/login` 時，Nest.js 將使用 Bearer Token 來驗證您的請求。如果您的請求包含一個有效的 Bearer Token，則您將能夠訪問該路由。如果您的請求不包含一個有效的 Bearer Token，則您將收到一個 401 錯誤。  
[首頁](../README.md)