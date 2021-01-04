const router = require('express').Router()

router.get('/', function (req, res) {
    if(!req.session.user)
    res.render('index')
    else
    res.render('recherche')
})


module.exports = router