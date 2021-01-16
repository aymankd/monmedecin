const mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "monmedecin"
});
var userid;
function User(){
    this.userid = 0;
};
User.prototype = {
    create: function(body,callback)
    {
        con.query("SELECT * FROM user where email = '"+body.email+"'", function (err, result, fields) {
            if (err) throw err;
            if(result.length == 0)
            {
                let sql = `INSERT INTO user(Email, Password) VALUES (?, ?)` ;
                con.query(sql,[body.email,body.password],function(err, data){
                    if(err) throw err;
                    let sql = `INSERT INTO patient(Id_user) VALUES (?)` ;
                    con.query(sql,[data['insertId']],function(er){
                        if(er) throw er;
                         callback(0);
                    })
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
                callback(null);
                }else
                {
                    callback(result[0].Id_user);
                }
            }
        })
    }
};

module.exports = User;