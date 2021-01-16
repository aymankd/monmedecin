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



module.exports = router