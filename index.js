const express = require('express')
const session = require('express-session')
const path = require('path')
const app = express()
const bodyParser = require('body-parser')

 
const homeRouter = require('./routes/home.routes')
const authRouter = require('./routes/auth.routes')
const RechRouter = require('./routes/rech.routes')
const UserRouter = require('./routes/user.routes')
const RDVRouter = require('./routes/rdv.routes')
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname,'assets')))
app.use(session({secret:"skdjhgfskd354fg35df3g57",resave:false,saveUninitialized:true}));
app.set('view engine','ejs')
app.set('views','views')

app.listen(4000,() =>{
  console.log("server listening on port 3000")  
})

app.use('/testcalendar', (req,res,next) => {
  res.render('gghtml')
})

app.use('/',homeRouter)
app.use('/',authRouter)
app.use('/',RechRouter)
app.use('/',UserRouter)
app.use('/',RDVRouter)

app.use(function (req, res) {
  res.render('404')
})



