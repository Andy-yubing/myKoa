const mysql = require("mysql");
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    port: '3306',
    database: 'nodesql'
});

const query = function(sql,values){
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (err) {
                resolve(err)
            } else {
                connection.query(sql, values, (err, rows) => {
                    //console.log(values);
                    if (err) {
                        reject(err)
                    } else {
                        //console.log(rows);
                        resolve(rows)
                    }
                    connection.release()
                })
            }
        })
    })
}

query().then((value)=>{
    console.log(value);
},(err)=>{
    console.log(err);
})

const createTbale = (sql)=>{
    query(sql,[]);
}

//建表
const users = 
    `create table if not exists users(
     id INT NOT NULL AUTO_INCREMENT,
     name VARCHAR(100) NOT NULL,
     pass VARCHAR(40) NOT NULL,
     avator VARCHAR(100) NOT NULL,
     moment VARCHAR(100) NOT NULL,
     PRIMARY KEY (id)
);`

const posts = `create table if not exists posts(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    title VARCHAR(40) NOT NULL,
    content VARCHAR(120) NOT NULL,
    uid VARCHAR(40) NOT NULL, 
    moment VARCHAR(100) NOT NULL,
    avator VARCHAR(100) NOT NULL,
    comments VARCHAR(100) NOT NULL,
    pv INT,
    PRIMARY KEY(id)
);`

const comment = `create table if not exists comment(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    content VARCHAR(40) NOT NULL,
    postid VARCHAR(40) NOT NULL,
    avator VARCHAR(100) NOT NULL,
    moment VARCHAR(100) NOT NULL,
    PRIMARY KEY(id)
);`

createTbale(users);

createTbale(posts);

createTbale(comment);

//注册用户
const insertData = function(value){
    let _sql = "insert into users(name,password) values(?,?)";
    //console.log(value);
    return query(_sql,value);
}

//通过名字查找用户
const findDataByName = function(name){
    let _sql = `
        select * from users where name="${name}";
    `
    return query(_sql);
}

//查询所有文章
const findAllPost = ()=>{
    let _sql = `select * from posts`;
    return query(_sql);
}

//查找用户
const findUserData = (name)=>{
    let _sql = `select * from users where name="${name}"`;
    return query(_sql);
}

//发表文章
const insertPosts = (values)=>{
    let _sql = `insert into posts(name,title,content,uid,moment,avator) values(?,?,?,?,?,?)`;
    return query(_sql,values);
}

//查询用户下的数据
const findDataByUser = (user)=>{
    let _sql = `select * from posts where name="${user}"`;
    return query(_sql);
}
//查询用户分页文章
const findPostByUserPage = (name,page)=>{
    let _sql = `select * from posts where name="${name}" order by id desc limit ${(page-1)*10},10`;
    return query(_sql); 
}
//查询分页文章
const findPostByPage = (page) => {
    let _sql = `select * from posts order by id desc limit ${(page - 1) * 10},10`;
    return query(_sql);
}

//根据id查询数据
const findIdContent = (tableName,id)=>{
    let _sql = `select * from ${tableName} where id="${id}"`;
    return query(_sql);
}

//插入评论的数据
const insertComment = (values)=>{
    let _sql = `insert into comment(name,content,postid,moment,avator) values(?,?,?,?,?)`;
    return query(_sql, values);
}

//更新文章评论数
const updatePostComment = (values)=>{
    let _sql = `update posts set comments=? where id=?`;
    return query(_sql,values);
}

//评论分页
const findCommentByPage = (postid,page) =>{
    let _sql = `select * from comment where postid = "${postid}" order by id desc limit ${(page - 1) * 10},10`;
    return query(_sql);
}

//更新评论数
const updatePostPv = (values) =>{
    let _sql = `update posts set pv=?  where id=?`;
    return query(_sql,values);
}

module.exports = {
    insertData,
    findDataByName,
    findAllPost,
    findUserData,
    insertPosts,
    findDataByUser,
    findPostByUserPage,
    findPostByPage,
    findIdContent,
    insertComment,
    updatePostComment,
    findCommentByPage,
    updatePostPv
}