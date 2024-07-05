```shell
Delete `␍` eslint(prettier/prettier) [第 1 行,第 36 欄]
```
修正指令為:
```shell
npm run lint --fix
```
或是在 `.eslintrc.js` 檔案新增參數 `'linebreak-style': 'off'`
與 `.prettierrc` 檔案新增參數 `"endOfLine": "auto"`
[首頁](../README.md)