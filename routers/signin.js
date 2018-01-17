const Router = require('koa-router');
const userModel = require('../sql/mysql');
const md5 = require('md5');

const router = new Router();

router.get("/signin",async(ctx,next)=>{
    await ctx.render('signin',{
        session: ctx.session,
    })
})
router.post("/signin", async (ctx, next) => {
    const name = ctx.request.body.name;
    const pass = ctx.request.body.password;
    await userModel.findDataByName(name).then(result => {
        console.log(result);
    })
})
module.exports = router;