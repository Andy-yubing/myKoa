const Router = require('koa-router');
const userModel = require('../sql/mysql');
const moment = require("moment");
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


//发表文章
router.get("/create",async (ctx,next)=>{
    await ctx.render("create", { session: ctx.session})
})
router.post("/create", async (ctx, next) => {
    console.log(ctx);
    
    const titText = ctx.request.body.title,
          content = ctx.request.body.content,
          id = ctx.session.id,
          name = ctx.session.user,
          time = moment().format('YYYY-MM-DD HH:mm:ss'),
          avator = "";
    console.log(name);
       
    await userModel.findUserData(name).then(res=>{
        console.log(res);
    })
    //ctx.body = true;
})






//用户登出
router.get("/signout", async (ctx, next) => {
    ctx.session = null;
    console.log('登出成功');
    ctx.body = true;
})
module.exports = router;


