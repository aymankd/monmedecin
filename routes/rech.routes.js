const router = require('express').Router()
const Search = require('../controllers/search')
const search = new Search();

router.post('/recherche',function (req, res) {
    SearchInput = req.body
    search.sch(SearchInput,function (resolt) {
        res.render('search_res',{data:resolt})
        console.log(resolt)
    })
})

module.exports = router