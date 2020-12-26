const express = require('express')
const path = require('path')
const app = express()

app.use(express.static(path.join(__dirname,'assets')))
app.set('view engine','ejs')
app.set('views','views')

app.listen(5050,() =>{
  console.log("server listening on port 3000")  
})

app.get('/', function (req, res) {
  res.render('index')
})

app.get('/login', function (req, res) {
  res.render('login')
})
app.get('/signup', function (req, res) {
  res.render('signup')
})

app.use(function (req, res) {
  res.render('404')
})