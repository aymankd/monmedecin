const mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "monmedecin"
});

function User(){

};
User.prototype = {
    create: function(body,callback)
    {

        con.query("SELECT * FROM user where email = '"+body.email+"'", function (err, result, fields) {
            if (err) throw err;

            if(result.length == 0)
            {
                let sql = `INSERT INTO user(Email, Password) VALUES (?, ?)` ;
                con.query(sql,[body.email,body.password],function(err, lastId){
                    if(err) throw err;
                    callback(0);
                })
            }else
            callback(1);
        });
    },
    login: function(body,callback)
    {
        con.query("SELECT * FROM user where email = '"+body.email+"' AND password ='"+body.pass+"'" ,
         function (err, result, fields) {
            if (err) 
                console.log(err.message);
            else {
                if(result.length == 0){
                callback(1);
                }else
                callback(0);
            }
        })
    }
};

module.exports = User;