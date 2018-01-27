const Router = require('koa-router');
const userModel = require('../sql/mysql');

const router = new Router();

router.get("/",(ctx,next)=>{
    ctx.redirect('/posts');
})

router.get("/posts", async (ctx, next) => {
     
    let res = '';
    
    console.log(ctx);  
    
    if (ctx.request.querystring){
        console.log('213');
    }else{
        await userModel.findAllPost().then(result => {
            res = JSON.parse(JSON.stringify(result));
            console.log(res);
        })
    }
    await ctx.render('posts',{
        session: ctx.session,
        posts: res
    })
})







//用户登出
router.get("/signout", async (ctx, next) => {
    ctx.session = null;
    console.log('登出成功');
    ctx.body = true;
})
module.exports = router;


