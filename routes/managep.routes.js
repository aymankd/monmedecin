
const router = require('express').Router()
const User = require('../controllers/user')
var userf = new User();

router.use('/manageprofile', (req,res) => {
       
    userf.getmaladies(function (maladies) {
        console.log("data parsed")
        console.log(maladies)
        res.render('manageprofile',{tabmaladies:maladies})
    })  
})

module.exports = router