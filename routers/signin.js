const Router = require('koa-router');
const userModel = require('../sql/mysql');
const md5 = require('md5');
const check = require('../middlewares/check');

const router = new Router();

router.get("/signin",async(ctx,next)=>{
    check.checkNotLogin(ctx)
    await ctx.render('signin',{
        session: ctx.session,
    })
})



router.post("/signin", async (ctx, next) => {
    //获取用户登录时的用户名,密码
    const name = ctx.request.body.name;
    const pass = ctx.request.body.password;
    
    await userModel.findDataByName(name).then(result => {
        
        console.log(result);
        const res = JSON.parse(JSON.stringify(result));
        console.log(res);
        
        //console.log(res[0]['id']);
         
        if (name == res[0]['name'] && md5(pass) === res[0].password){
            ctx.body = 'true';
            ctx.session.user = res[0]['name'];
            ctx.session.id = res[0]['id'];
            console.log('登录成功');
        }else{
            ctx.body = 'false';
            console.log('用户名或密码错误!')
        }
    }).catch(err => {
        ctx.body = 'false';
        console.log('用户名或密码错误!')
    })  
})


module.exports = router;