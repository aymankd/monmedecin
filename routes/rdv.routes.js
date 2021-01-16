const router = require('express').Router()
const User = require('../controllers/user')
var userf = new User();

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

module.exports = router