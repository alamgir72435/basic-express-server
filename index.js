const express = require('express')
const exphbs = require("express-handlebars")


const app = express()

// Middleware
app.engine("handlebars", exphbs())
app.set("view engine", "handlebars")

const port= 5000;


app.get('/', (req,res)=> {
	res.render("home")
})

app.get('/about', (req, res) => {
	res.render("about")
})

	
app.listen(port,console.log('server running '+port))