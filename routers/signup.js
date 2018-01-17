const Router = require('koa-router');
const userModel = require('../sql/mysql');
const md5 = require('md5');


const router = new Router();
//注册页
router.get('/signup',async (ctx,next)=>{
    /* console.log(ctx.render)
    console.log(ctx.session) */
    console.log(ctx.session);
    await ctx.render('signup', { session: ctx.session})
})

//post 注册
router.post('/signup', async (ctx,next) =>{
    console.log(ctx.request.body);
    var user = {
        name: ctx.request.body.name,
        pass: ctx.request.body.password,
        repeatpass: ctx.request.body.repeatpass
    }
    await userModel.findDataByName(user.name).then(result => {
        //console.log(result.length);
        if(result.length){
            try{
                throw Error(`用户名已经存在`)
            }catch(err){
                console.log(err);
            }
            ctx.body = {
                data: 1
            };
        } else if (user.pass !== user.repeatpass || user.name ==""){
            ctx.body = {
                data: 2
            };
        }else{
            ctx.body = {
                data: 3 
            };
            userModel.insertData([user.name, md5(user.pass)])
        }
    })
    
}) 

module.exports = router;

