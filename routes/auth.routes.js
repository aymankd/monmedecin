const router = require('express').Router()
const User = require('../controllers/user')
const user = new User();

router.get('/signup', (req,res,next) => {
    res.render('signup')
})

router.post(
    '/signup',(req,res,next) => {
        let pass=req.body.pass;
        let confpass=req.body.confpass;

        if(pass==confpass){
            let UserInput = {
                email: req.body.email,
                password: req.body.pass
            };
            user.create(UserInput,function (resolt) {
                if(resolt==0)
                    res.render('login');
                else if(resolt==1)
                res.render('signup',{msg:'error : email existe déja'});
            })
        }
        else
        res.render('signup',{msg:'error : passwords are not the same'});
    }
)
router.get('/login', (req,res,next) => {
    res.render('login')
})
router.post(
    '/login',(req,res,next) => {
        let UserInput = {
            email: req.body.email,
            password: req.body.pass
        };

        user.login(UserInput,function (lastId) {
            if(lastId)
                res.send('Welcome'+ UserInput.email);
            else
                console.log('error creating user');
            
        })
    }
)
module.exports = router