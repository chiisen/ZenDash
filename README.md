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
- port 設定參考 `main.ts` 檔案的 `await app.listen(5002);` 裡面的 port 設定
可以修改 `.env` 檔案調整 port
1. 本地瀏覽 http://localhost:5002/
2. 遠端瀏覽 http://10.20.37.26:5002/
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

# git commit message
- 常用描述
```
✨ feat: 需求功能描述
🐛 fix: 修正 bug 的問題描述
💄 optimize: 最佳化程式碼或功能流程
🔧 chore: 雜事，例如: 調整設定檔案等等 
```

