
const router = require('express').Router()
const User = require('../controllers/user')
var userf = new User();

router.use('/manageprofile', (req,res) => {
let user_id = req.session.user.userid;
    userf.getinfopatient(user_id,function (maladies,info) {
        res.render('manageprofile',{tabmaladies:maladies , infopatient:info})
    })  
})

router.post('/ManageProfile',(req,res,next) => {
       var user_id = req.session.user.userid;
        let UserInput = {
            pass: req.body.pass,
            newpass: req.body.newpass,
            confpass: req.body.confpass
        };
        user.setnewpass(user_id,UserInput,function (resolt) {
            if(resolt==0)
                res.render('ManageProfile',{msg:'Mot de passe incorrect'});
                else 
                {
                    if(resolt==1)
                        res.render('ManageProfile',{msg:'Nouveau mot de passe incorrect'});
                    else{
                        console.log("foekoefk");
                        callback();
                    }
                }
            })


    })
module.exports = router