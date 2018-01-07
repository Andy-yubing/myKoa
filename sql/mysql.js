const mysql = require("mysql");
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
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
                    if (err) {
                        reject(err)
                    } else {
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
const users = `create table if not exists users(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    password VARCHAR(40) NOT NULL,
    PRIMARY KEY (id)
);`

const posts = `create table if not exists posts(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    title VARCHAR(40) NOT NULL,
    content VARCHAR(120) NOT NULL,
    uid VARCHAR(40) NOT NULL, 
    moment VARCHAR(40) NOT NULL,
    comments VARCHAR(40) NOT NULL DEFAULT '0',
    pv VARCHAR(40) NOT NULL DEFAULT '0',
    PRIMARY KEY(id)
);`

const comment = `create table if not exists comment(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    content VARCHAR(40) NOT NULL,
    postid VARCHAR(40) NOT NULL,
    PRIMARY KEY(id)
);`

createTbale(users);

createTbale(posts);

createTbale(comment);

//注册用户
const insertData = function(value){
    let _sql = "insert into users(name,pass) values(?,?);"
    return query(_sql,value);
}


//删除用户(测试使用)
module.exports = {
    insertData,
}