在 Nest.js 中，您可以創建一個自定義裝飾器，例如 @Public()，來模擬 ASP.NET 的 AllowAnonymous 功能。這需要您的應用程式使用 AuthGuard 並設置一個全域的默認策略。

首先，您需要創建一個 @Public() 裝飾器。在 public.decorator.ts 文件中：
```ts
import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
```

然後，在您的全域守衛中，檢查路由是否為公開的：

```ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from './public.decorator';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    // ... add your authentication logic here
  }
}
```

最後，將 @Public() 裝飾器添加到您的路由處理器上：

```ts
import { Public } from './public.decorator';

@Post('login')
@Public()
login(): string {
  return this.memberService.getHello();
}
```
[首頁](../README.md)