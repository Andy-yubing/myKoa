const Router = require('koa-router');
const userModel = require('../sql/mysql');
const moment = require("moment");
const router = new Router();
const md = require('markdown-it')();
router.get("/",(ctx,next)=>{
    ctx.redirect('/posts');
})

router.get("/posts", async (ctx, next) => {
     
    let res = '', name = ctx.request.querystring.split("=")[1], postsLength = "";

    console.log(name);
    
    if (ctx.request.querystring){
        await userModel.findDataByUser(name).then(result => {
            console.log(result);
            postsLength = result.length;
        })
        await userModel.findPostByUserPage(name, 1).then(result => {
            res = result
        })
        await ctx.render('posts', {
            session: ctx.session,
            posts: res,
            postsPageLength: postsLength
        })
    }else{
        await userModel.findAllPost().then(result => {
            postsLength = result.length;
        })
        await userModel.findPostByPage(1).then(result => {
            res = result
        })
        await ctx.render('posts', {
            session: ctx.session,
            posts: res,
            postsPageLength: postsLength
        })
    }

    
})


//发表文章发表文章发表文章发表文章
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

    //console.log(newTitle);
             
    await userModel.findUserData(name).then(res=>{
        console.log(res);
        avator = res[0]['avator']
    })
    
    await userModel.insertPosts([name, newTitle, content, id, time, avator]).then(res => {
        ctx.body = true;
    }).catch(err => {
        console.log(err);
        ctx.body = false;
    })
})

//单篇文章页详情
router.get("/posts/:id",async (ctx,next)=>{
    //console.log(ctx);
    let id = ctx.params.id, res = "", comment_res = "", pageOne = "" , pv = "";
    
    await userModel.findIdContent('posts',id).then((result)=>{
        console.log(result[0]);
        res = result;
        pv = parseInt(result[0].pv);  
        pv += 1;
    })
    await userModel.findIdContent('comment', id).then((result) => {
        //console.log(result);
        comment_res = result;
    })
    //console.log(pv);
    await userModel.updatePostPv([pv,id]).then((result)=>{
        //console.log(result);
    })
    
    await userModel.findCommentByPage(id, 1).then((result) => {
        //console.log(result);
        pageOne = result;
    })
    
    await ctx.render('leave', {
        session: ctx.session,
        posts: res[0],
        commentPageLenght: comment_res.length,
        pageOne: pageOne,
    })
})

//<%= posts.id %>/comment/" + id + "/remove

//删除文章页详情评论
router.post("/posts/:postId/comment/:commentId/remove", async (ctx, next) => {
    console.log(ctx);
    let commentID = ctx.params.commentId , postID = ctx.params.postId;
    await userModel.deletePostDetails(commentID).then((res)=>{
        ctx.body = {
            data: 1
        }
    }).catch(()=>{
        ctx.body = {
            data: 2
        }
    })
})

//删除留言
router.post("/posts/:id/remove",async (ctx,next)=>{
    console.log(ctx);
    let postId = ctx.params.id;
    await userModel.deletePost(postId).then((res)=>{
        ctx.body = {
            data: 1
        }
    }).catch((err)=>{
        ctx.body = {
            data: 2
        }
    })
})
//发表留言
router.post("/:id",async (ctx,next)=>{
    //console.log(ctx);
    let commentCon = ctx.request.body.content,
        time = moment().format('YYYY-MM-DD HH:mm:ss'),
        name = ctx.session.user,
        res_comments = "",avator = "",
        postid = ctx.params.id;
    await userModel.findUserData(name).then((result)=>{
        //console.log(result);
        avator = result[0].avator;
    });
    await userModel.insertComment([name, md.render(commentCon), postid, time, avator]).then((res)=>{
        console.log(res);
    })
    
    await userModel.findIdContent("posts", postid).then((res)=>{
        res_comments =  res[0].comments;
        res_comments += 1;
        console.log(res_comments);
    })

    await userModel.updatePostComment([res_comments, postid]).then((res)=>{
       ctx.body = true;
    }).catch(()=>{
       ctx.body = false; 
    })
})

//编辑单篇文章
router.get("/posts/:id/edit",async (ctx,next)=>{
    console.log(ctx);
    let postsId = ctx.params.id,
        id = ctx.session.id,
        postId = ctx.params.postId,
        
})



//用户登出
router.get("/signout", async (ctx, next) => {
    ctx.session = null;
    console.log('登出成功');
    ctx.body = true;
})





module.exports = router;


