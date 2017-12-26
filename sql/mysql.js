const mysql = require("mysql");
const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 123456,
    port: 3306,
    database: 'nodesql'
});

let query = function(sql,values){
    return new Promise((resolve,reject)=>{
         pool.getConnection(function(err,connection){
             if(err){
                resolve(err);
             }else{
                connection.query(sql,values,(err,rows)=>{
                    if(err){
                        reject(err);
                    }else{
                        resolve(rows);
                    }
                    connection.release();
                })
             }
         })
    })
}