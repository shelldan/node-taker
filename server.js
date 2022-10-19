//load/import express module, express is a module that can be used to create more than one application 
const express = require('express');
const { appendFile } = require('fs');
const path = require('path');
const api = require('./routes/api.js')


//process.env.PORT for heroku
const PORT = process.env.PORT || 3001;


//running/starting express
//put express module into the variable 'app'. Once you have a reference to the module, you can use it to create application. Each module has its own API
//one application listens on one port 
const app = express();

// Middleware for parsing JSON and urlencoded form data
// app.use for middleware
// express.json() handle all incoming requests and see if there is JSON and converting to object. 
app.use(express.json()); //express = message sending application, we need something connect to html and database
app.use(express.urlencoded({ extended: true}))// old way working with url
app.use('/api', api); //root = '/api' 


// app.use(express.static()) adds a middleware for serving static files to your Express app. (set the static path)
// express.static middleware to make it possible to access files from this folder 
app.use(express.static('public'))


// console.log(__dirname)// return ..note-taker
// GET Route for Note Taker homepage -> localhost:3001/
app.get('/', (req, res) => 
    //send a raw file as a response to an HTTP request (localhost:3001/)
    res.sendFile(path.join(__dirname,'/public/index.html')) //note-taker/public/index.html
) 

// GET Route for Note Taker page -> localhost:3001/notes 
app.get('/notes', (req, res)=>
    //send a raw file as a response to HTTP request (localhost:3001/notes )
    res.sendFile(path.join(__dirname, '/public/notes.html')) //note-taker/public/notes.html
)

app.listen(PORT, ()=>{
    console.log(`App listening at http://localhost:${PORT}`)
})

