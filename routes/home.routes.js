const router = require('express').Router()

router.get('/', function (req, res) {
    if(!req.session.user)
    res.render('index')
    else if(req.session.type=="patient")
    res.render('recherche')
    else if(req.session.type=="medecin")
    res.render('prfilemedecin')
})


module.exports = router