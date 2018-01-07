const Router = require('koa-router');
const userModel = require('../sql/mysql');
const md5 = require('md5');



const router = new Router();
//注册页
router.get('/signup',async (ctx,next)=>{
    /* console.log(ctx.render)
    console.log(ctx.session) */
    await ctx.render('signup', { session: ctx.session})
})

//post 注册
router.post('/signup',async(ctx,next) =>{
    console.log(ctx.request.body);
    
})

module.exports = router;

