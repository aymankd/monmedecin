const router = require('express').Router()
const User = require('../controllers/user')
var userf = new User();

    router.use('/Rendez_vous', (req,res,next) => {
        var userm = req.session.user;
    userf.getmedecintrdv(userm.userid,function (resss) {
        res.render('Rendez_vous',{rdv:resss})
        })
        
    })
    router.use('/calendrier', (req,res,next) => {
        res.render('calendrier')
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
        var userm = req.session.user;
    var datam = req.body;
    var rdvdata = {userid : userm.userid,medecinid : datam.idmedecin};
    userf.supprimerRDV(rdvdata,function () {
        res.send('Supprimer avec succes')
        })
    })
    router.post('/Confrdvmedecin', (req,res) => {
        var userm = req.session.user;
    var datam2 = req.body;
    var rdvdata2 = {userid : userm.userid,medecinid : datam2.idmedecin, date:datam2.date};
    userf.confirmerRDV(rdvdata2,function () {
        res.send('Confirmer avec succes')
        })
    })
    
    

module.exports = router