# ZenDash
禪心儀表板: 代表冥想和平靜，這個名稱暗示了一個平靜且直觀的儀表板。

# 初始化
- nest
```shell
npm install -g @nestjs/cli

nest -h

npm i
```

# 執行
```shell
npm run start
```
- port 設定參考 `main.ts` 檔案的 `await app.listen(8000);` 裡面的 port 設定
可以修改 `.env` 檔案調整 port
1. 本地瀏覽 http://localhost:8000/
2. 遠端瀏覽 http://10.20.37.26:8000/
- 用 8000 是因為要避免被瀏覽器認為是不安全的端口，被稱為 "unsafe ports" 的列表
下面是一些可使用的常用端口
```
3000: 常被 Node.js 應用程式使用
8000 或 8080: 常被 Web 伺服器，如 Apache 或 Nginx 使用
5432: PostgreSQL 的預設端口
27017: MongoDB 的預設端口
```
# 修正 eslint 錯誤
[範例與說明](./docs/eslint.md)

# 利用 nest cli 建立 controller
```shell
nest g controller member
nest g controller game
```

# 利用 nest cli 建立 service
```shell
nest g service member
```

# 讀取 .env 設定檔案
[範例與說明](./docs/config.md)

# 找不到模組
```shell
npm install @nestjs/core
npm install @nestjs/common
npm install @nestjs/config
```

# 新增 Logger
[範例與說明](./docs/logger.md)

# Bearer Token 認證
[範例與說明](./docs/Bearer_Token.md)

# 公開一個 API(不須驗證)
模擬 ASP.NET 的 AllowAnonymous 功能
[範例與說明](./docs/public.decorator.md)


# MSSQL
```shell=
npm install mssql
```

# git commit message
- 常用描述
```
✨ feat: 需求功能描述
🐛 fix: 修正 bug 的問題描述
💄 optimize: 最佳化程式碼或功能流程
🔧 chore: 雜事，例如: 調整設定檔案等等 
```

# swagger
http://localhost:8000/swagger

# CROS
main.ts 不要限制 CROS 直接寫 app.enableCors(); 就可以

# redis
```
npm install @nestjs-modules/ioredis ioredis
```


