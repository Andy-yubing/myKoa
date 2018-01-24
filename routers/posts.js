const Router = require('koa-router');
const userModel = require('../sql/mysql');

const router = new Router();

router.get("/",(ctx,next)=>{
    ctx.redirect('/posts');
})
router.get("/posts",async (ctx, next) => {
    console.log(ctx);
    if (ctx.request.querystring){
        
    }else{
        
    }
    await ctx.render('posts',{
        session: ctx.session,
    })
})


module.exports = router;


