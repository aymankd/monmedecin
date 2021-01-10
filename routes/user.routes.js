const router = require('express').Router()
const Search = require('../controllers/search')
const search = new Search();

router.get('/seemore/', (req,res) => {
    res.render('seemore')
})


router.use('/seemore/:id', (req,res) => {
    medecinId = req.params.id;
    search.seemore(medecinId,function (medinfo) {
        res.render('seemore',{med:medinfo})
        console.log(medinfo)
    })
})


module.exports = router