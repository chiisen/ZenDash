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
瀏覽 http://localhost:3000/

# 修正 eslint 錯誤
```
Delete `␍` eslint(prettier/prettier) [第 1 行,第 36 欄]
```
修正指令為:
```
npm run lint --fix
```
或是在 `.eslintrc.js` 檔案新增參數 `'linebreak-style': 'off'`
與 `.prettierrc` 檔案新增參數 `"endOfLine": "auto"`

