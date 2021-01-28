const router = require('express').Router()
const Search = require('../controllers/search')
const search = new Search();
var medecinId;
var user_id;
router.use('/seemore/:id', (req,res) => {
    medecinId = req.params.id;
    user_id = req.session.user.userid;
    search.seemore(medecinId,function (medinfo) {
        // connected_user_id : req.session.user.userid
        // medecin id : medecinId
         var rdvids = {userid : user_id,medecinid : medecinId};
         search.testrendezvous(rdvids,function (demande) {
            res.render('seemore',{med:medinfo,rdv:demande})
         })
        
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