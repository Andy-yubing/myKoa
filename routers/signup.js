const Router = require('koa-router');
const userModel = require('../sql/mysql');
const md5 = require('md5');



const router = new Router();
//注册页
router.get('/signup',async (ctx,next)=>{
    console.log(ctx.session)
    await ctx.render('signup', { session: ctx.session})
})




module.exports = router;

