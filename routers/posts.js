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
    
    let titText = ctx.request.body.title,
          content = ctx.request.body.content,
          id = ctx.session.id,
          name = ctx.session.user,
          time = moment().format('YYYY-MM-DD HH:mm:ss'),
          avator = "",
          newTitle = titText.replace(/[<">']/g, (target) => {
            return {
                '<': '&lt;',
                '"': '&quot;',
                '>': '&gt;',
                "'": '&#39;'
            }[target]
        });

    console.log(newTitle);
            
    await userModel.findUserData(name).then(res=>{
        console.log(res);
        avator = res[0]['avator']
    })
    
    await userModel.insertPosts([name, newTitle, content, id, time, avator, comments, pv]).then(res => {
        ctx.body = true;
    }).catch(err => {
        console.log(err);
        ctx.body = false;
    })

})






//用户登出
router.get("/signout", async (ctx, next) => {
    ctx.session = null;
    console.log('登出成功');
    ctx.body = true;
})
module.exports = router;


