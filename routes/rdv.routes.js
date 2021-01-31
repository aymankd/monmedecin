const router = require('express').Router()
const User = require('../controllers/user')
var userf = new User();

    router.use('/calendrier', (req,res,next) => {
        var userm = req.session.user;
        userf.getmedecinrdv(userm.userid,function (resss) {
            res.render('calendrier',{data:resss})
        })
    })

    router.use('/Rendez_vous', (req,res,next) => {
        var userm = req.session.user;
        userf.getmedecintrdv(userm.userid,function (resss) {
            console.log("data parsed")
            console.log(resss)
            if(resss)
            res.render('Rendez_vous',{rdv:resss})
            else 
            res.render('EmptyRendezV')
        })  
    })

    router.post('/rendezvous',function (req, res) {
        var user = req.session.user;
        var data = req.body;
        var rdvids = {userid : user.userid,medecinid : data.idmedecin};
        if(data.type == "annuler")
        userf.annulerrdv(rdvids,function () {
            res.send('Annulation avec succes')
        }) 
        else if(data.type == "demander")
        userf.demanderrdv(rdvids,function () {
            res.send("Demander avec succes")
        })    
    })
    router.post('/Supprdvmedecin', (req,res) => {
       var userm  = req.session.user;
    var datam = req.body;
    var rdvdata = {medecinid : userm.userid,userid : datam.idu};
    userf.supprimerRDV(rdvdata,function () {
        res.send('Supprimer avec succes')
        })
    })
    router.post('/Confrdvmedecin', (req,res) => {
        var userm = req.session.user;
    var datam2 = req.body;
    var rdvdata2 = {medecinid : userm.userid,userid : datam2.idu, date:datam2.date};
    userf.confirmerRDV(rdvdata2,function () {
        res.send('Confirmer avec succes')
        })
    })
    
    

module.exports = router