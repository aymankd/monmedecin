
const router = require('express').Router()
const User = require('../controllers/user')
var userf = new User();

router.use('/manageprofile', (req,res) => {
let user_id = req.session.user.userid;
    userf.getinfopatient(user_id,function (maladies,info) {
        console.log("maladies")
        console.log(maladies)
        console.log("info")
        console.log(info)
        res.render('manageprofile',{tabmaladies:maladies , infopatient:info})
    })  
})

router.post(
    '/ajoutezinfo',(req,res,next) => {
        user_id = req.session.user.userid;
        let nom=req.body.nom;
        let prenom=req.body.prenom;
        let age=req.body.age;
        let telephone=req.body.telephone;

            let UserInput = {
                nom:req.body.nom,
                prenom:req.body.prenom,
                age:req.body.age,
                telephone:req.body.telephone

            };
            user.setinfopatient(user_id,UserInput,function (resolt) {
                    
            })
    })

module.exports = router