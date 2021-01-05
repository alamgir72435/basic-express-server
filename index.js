const express = require('express')
const exphbs = require("express-handlebars")
const bodyParser = require("body-parser")
const port= 5000;
const app = express()
const users = []

// Middleware
app.engine("handlebars", exphbs())
app.set("view engine", "handlebars")

// Body parser
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())



// Get Request Handle
app.get('/', (req,res)=> {
	res.render("home")
})

app.get('/allusers',(req,res) => {
	res.render('users', {
		users
	})
})

app.get('/about',  (req, res) => {
	res.render("about")
})

// Post Request Handle
app.post('/user',(req, res) => {
	const { name, phone } = req.body
	let user = { name:name, phone:phone }
	users.push(user)
	res.redirect('/allusers')
})
	
app.listen(port,console.log('server running '+port))