const mysql = require("mysql");
const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 123456,
    port: 3306,
    database: 'nodesql'
});

const query = function(sql,values){
    return new Promise(function(reslove, reject){
        pool.getConnection((err,connection)=>{
            if(err){
                reject(err);
            }else{
                connection.query(sql,values,(err,results)=>{
                    if(err){
                        reject(err);
                    }else{
                        resolve(results);
                    }
                })
            }
            connection.release()
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


createTbale(users);
