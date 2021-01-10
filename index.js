const express = require('express')
const exphbs = require("express-handlebars")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const port= 5000;
const app = express()
const users = []
const uri = 'mongodb+srv://agradut:agradut@cluster0.dziq6.mongodb.net/mysite?retryWrites=true&w=majority'
// Middleware
app.engine("handlebars", exphbs())
app.set("view engine", "handlebars")

// Database Connection  (MongoDB)
mongoose.connect(uri, {
	useNewUrlParser:true,
	useUnifiedTopology:true
}).then(() => {
	console.log(`MongoDB Connected`)
}).catch((error) => {
	console.log(error)
})


// Data Format / Schema 
// Schema 
const messageSchema = new mongoose.Schema({
	name:{type:String},
	email:{type:String},
	subject:{type:String},
	message:{type:String}
})

// Model 
const Message = mongoose.model('messages',messageSchema)



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
	const { name, email, subject, message } = req.body

	const user = new Message({
		name,
		email,
		subject,
		message
	})

	user.save().then(newUser => {
		if(newUser){
			res.redirect('/allusers')
		}
	}).catch(err => {
		console.log('Something went Wrong !')
	})


	
	
})
	
app.listen(port,console.log('server running '+port))