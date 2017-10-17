Vue + Express 构建项目
=========================================
### 用法

1. 安装依赖包

   `npm install`

2. 运行开发环境

   `npm run dev`

3. build前端代码

    `npm run build`
4. 运行生产环境

    `npm start`
    

### 文件目录
```
.
├── README.md
├── nodemon.json
├── package.json
├── .gitignore
├── .babelrc
├── index.js
├── index.html
├── static
├── src
│   ├── client
│   │   ├── App.vue
│   │   ├── router
│   │   │   └── index.js
│   │   ├── components
│   │   │   └── Hello.vue
│   │   └── main.js
│   └── server
│       ├── bin
│       │   └── www
│       ├── index.js
│       ├── router.js
│       ├── public
│       │   ├── javascripts
│       │   └── stylesheets
│       └── views
│           ├── index.ejs
│           ├── index_dev.ejs
│           └── error.ejs
├── build
│   ├── build.js
│   ├── clicheck-version.js
│   ├── dev-client.js
│   ├── utils.js
│   ├── vue-loader.conf.js
│   ├── webpack.base.conf.js
│   ├── webpack.dev.conf.js
│   └── webpack.prod.conf.js
├── config
│   ├── dev.env.js
│   ├── index.js
│   └── prod.env.js
```

### 参考地址

- [从零开始搭建 Express + Vue 开发环境](http://southerncross.github.io/2016/02/28/setup-express-vue-boilerplate/)
- [打通前后端 -- 构建一个 Vue + Express 的开发环境](http://www.jianshu.com/p/204458e07dbd)
