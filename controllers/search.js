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
    },
    testrendezvous: function(ids,callback){
        con.query("SELECT * FROM rendezvous where id_medecin = "+ids.medecinid+" and id_patient = "+ids.userid+" and demande = true " , function (err, result) {
            if (err) 
                console.log(err.message)
            else if(result.length == 0)
                callback(true)
            else if(result.length > 0)
                callback(false)
        }); 

    }
};

module.exports = Search;