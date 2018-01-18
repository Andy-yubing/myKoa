const Router = require('koa-router');
const userModel = require('../sql/mysql');

const router = new Router();

router.get("/",(ctx,next)=>{
    ctx.redirect('/posts');
})
router.get("/posts", (ctx, next) => {
    ctx.render('/posts');
})