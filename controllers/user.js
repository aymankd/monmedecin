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
                let sql = `INSERT INTO user(Email, Password,type) VALUES (?, ?,false)` ;
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
                    callback(result[0]);
                }
            }
        })
    },
    annulerrdv: function(ids,callback)
    {
        con.query("DELETE FROM `rendezvous` WHERE id_medecin="+ids.medecinid+" and id_patient="+ids.userid , function (err, result) {
            if (err) 
                console.log(err.message)
            callback();
        }); 
    },
    demanderrdv: function(ids,callback)
    {
        con.query("INSERT INTO `rendezvous`(`id_medecin`, `id_patient`, `date`, `demande`) VALUES ("+ids.medecinid+","+ids.userid+",CURRENT_DATE,true)" , function (err, result) {
            if (err) 
                console.log(err.message)
            callback();
        }); 

    },
    supprimerRDV : function(ids,callback){
        con.query("DELETE FROM `rendezvous` WHERE id_medecin="+ids.medecinid+" and id_patient="+ids.userid , function (err, result) {
            if (err) 
                console.log(err.message)
            callback();
        }); 
    },
    confirmerRDV : function(data,callback){
        con.query("UPDATE `rendezvous` SET daterdv ='"+data.date+"' , demande = 0 WHERE id_medecin="+data.medecinid+" and id_patient="+data.userid , function (err, result, fields) {
            if (err) 
            console.log(err.message)
        callback();
        }); 
    },
    getmedecintrdv : function(idm,callback){
        console.log('id medecin : '+idm)
        var rdvdata={"rendvinfo":[]};
        var count = 0;
        con.query("SELECT * FROM rendezvous where id_medecin = "+idm+" and demande = true ",
         function (err, result) {
            if (err) 
                console.log(err.message);
            else {
                if(result.length!=0)
                result.forEach(element => {
                    console.log("entred foreach")
                    con.query("SELECT * FROM patient where Id_user = "+element.id_patient,
                        function (err1, res) {
                        if (err1)
                            console.log(err1.message);
                        else{
                            console.log(element.date)
                       var rowline = {'nom':res[0].Nom,'prenom':res[0].Prenom,'date':element.date,'idp':element.id_patient};
                        rdvdata["rendvinfo"].push(rowline);
                        console.log("entred foreach query")
                        count++;
                        if(count == result.length)
                        {
                            callback(rdvdata);            
                        }
                        }
                    })
                });
                else
                callback(null)
            }
        })
    },
    getmedecinrdv : function(id,callback){
        con.query("SELECT * FROM rendezvous where id_medecin = "+id+" and demande = false ", function (err, result, fields) {
            if (err) 
            console.log(err.message)
            else if(result.length!=0)
                callback(result);
            else
                callback(null);
        }); 
    },
    setinfopatient : function(id,body,callback){
        
        con.query("UPDATE `patient` SET `Nom`="+body.nom+",`Prenom`="+body.prenom+",`Age`="+body.age+" ,`Telephone`="+body.telephone+" WHERE Id_user="+id) , function (err, result) {
           if (err) 
                console.log(err.message)
            callback();

        }; 
    },
    getinfopatient : function (id,callback){
        con.query("SELECT nom FROM maladies", function (err, result){
            if (err) 
                console.log(err.message)
               else
                con.query("SELECT * FROM patient where Id_user ="+id, function (err1, result1){
                    if (err1) 
                        console.log(err1.message)
                    callback(result,result1);  
                });
        });
        
    }
    
};

module.exports = User;