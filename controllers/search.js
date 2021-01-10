const mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "monmedecin"
});

function Search(){
};

Search.prototype = {
    sch: function(body,callback)
    {
        con.query("SELECT * FROM medecin where Nom_M like '%"+body.Stxt+"%' or  Prenom_M like '%"+body.Stxt+"%' or Specialité like '%"+body.Stxt+"%' or Hopital like '%"+body.Stxt+"%' or Ville like '%"+body.Stxt+"%'  " , function (err, result) {
            if (err) 
                console.log(err.message);
            else
            callback(result);
        }); 
    },
    seemore: function(id,callback)
    {
        con.query("SELECT * FROM medecin where Id_user = "+id , function (err, result) {
            if (err) 
                console.log(err.message);
            else
            callback(result);
        }); 
    }
};

module.exports = Search;