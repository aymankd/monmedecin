const util =  require('util');
const mysql = require('mysql');


var pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database:"monmedecin"
});

pool.getConnection(function(err,connection) {
    if (err) 
        console.log("database connexion Problem !");
    if(connection)
        connection.release();
        return;
  });

pool.query = util.promisify(pool.query);

module.exports = pool;
  