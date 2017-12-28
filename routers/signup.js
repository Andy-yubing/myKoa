const Router = require('koa-router');

const router = new Router();
//注册页
router.get('./signup',async (ctx,next)=>{
    await ctx.render('signup',{
        
    })
})


module.exports = router;