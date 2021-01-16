const router = require('express').Router()
const Search = require('../controllers/search')
const search = new Search();

router.post('/recherche',function (req, res) {
   var SearchInput = req.body
    search.sch(SearchInput,function (resolt) {
        res.render('search_res',{data:resolt})
    })
})

module.exports = router