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
        console.log("MedecinId : "+medecinId)
        console.log("UserId : "+user_id)
        
        res.render('seemore',{med:medinfo})
    })
})



module.exports = router