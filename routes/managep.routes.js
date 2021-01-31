
const router = require('express').Router()
const User = require('../controllers/user')
var userf = new User();

router.post('/changepass',(req,res,next) => {
       var user_id = req.session.user.userid;
        let UserInput = {
            pass: req.body.oldpass,
            newpass: req.body.newpass
        };
        userf.setnewpass(user_id,UserInput,function (resolt) {
            if(resolt==0)
                res.send(false);
                else 
                {  
                    res.send(true);
                }
            })


    })
    router.post('/changeinfo',(req,res,next) => {
        var user_id = req.session.user.userid;
         userf.setinfopatient(user_id,req.body,function (resolt) {
             if(resolt==0)
                 res.send(false);
                 else   
                 res.send(true);
             })
 
 
     })
 
router.use('/manageprofile', (req,res) => {
let user_id = req.session.user.userid;
    userf.getinfopatient(user_id,function (maladies,info) {
        res.render('manageprofile',{tabmaladies:maladies , infopatient:info})
    })  
})
module.exports = router