const express = require('express')
const app = express()
const port= 5000;


app.get('/', (req,res)=> {
	res.send('you are in our express server')
})


app.listen(port,console.log('server running'))