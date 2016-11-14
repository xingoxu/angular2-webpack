# Angular2 Build by Webpack
<br>
Angular2 使用Webpack构建的脚手架（可多页面）
<br>
* 使用ts
* 可写plain js，可写es6，使用babel编译
<br>
```
npm run start //启动dev
npm run build //完整构建
npm run build2 //使用webpack命令行构建 效果与build一致
```
<br>
目录结构：<br>
├─build <-构建脚本目录<br>
├─config <-构建配置目录<br>
├─src <-项目代码<br>
│  ├─app<br>
│  └─pages <-多页面<br>
│      └─index <-默认单页面，如果需要多页面则在pages下新建文件夹<br>
│　　　　　，main.ts不要变化，html与文件夹保持一致即可，在pages下不要放其他ts与js<br>
│<br>
├─public <-项目资源，可css，可图片，可字体<br>
└─static <-其他静态文件<br>
