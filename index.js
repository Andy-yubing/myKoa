const Koa = require('koa');
const path = require('path');
const bodyParser = require('koa-bodyparser');
const ejs = require('ejs');
const session = require('koa-session-minimal');
const MysqlStore = require('koa-mysql-session');
const router = require('koa-router');
const views = require('koa-views');
const koaStatic = require('koa-static');
const config = require('./config/default.js');
const signup = require("./routers/signup");
const signin = require("./routers/signin");
const posts = require("./routers/posts");
//console.log(signup);

const app = new Koa();

// session存储配置
const sessionMysqlConfig = {
    user: 'root',
    password: '123456',
    database: 'nodesql',
    host: 'localhost',
}



//配置session中间件
app.use(session({
    key: 'USER_SID',
    store: new MysqlStore(sessionMysqlConfig)
}))

// 使用表单解析中间件
app.use(bodyParser());

// 配置静态资源加载中间件
app.use(koaStatic(
    path.join(__dirname, './public')
))

// 配置服务端模板渲染引擎中间件
app.use(views(path.join(__dirname, './view'), {
    extension: 'ejs'
}))

//koa-router
//注册
app.use(signup.routes());
//登录
app.use(signin.routes());
//首页
app.use(posts.routes());


// 监听在3000端口
app.listen(3000);