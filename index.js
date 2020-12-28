const express = require('express')
const path = require('path')
const app = express()
const bodyParser = require('body-parser')
 
const homeRouter = require('./routes/home.routes')
const authRouter = require('./routes/auth.routes')
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname,'assets')))
app.set('view engine','ejs')
app.set('views','views')

app.listen(4000,() =>{
  console.log("server listening on port 4000")  
})

app.use('/',homeRouter)
app.use('/',authRouter)
app.use(function (req, res) {
  res.render('404')
})

