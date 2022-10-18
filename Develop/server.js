const express = require('express'); //importing express module 
const { appendFile } = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3001;

// running/starting express
const app = express();



// Middleware for parsing JSON and urlencoded form data
// app.use is intended for binding middleware to your application (resource: StackOverflow - Difference between app.use and app.get in express.js)
app.use(express.json()); //putting constraint, we want to use json in express (we could do JSON.parse, or other JSON method); express = message sending application, we need something connect to html, database
app.use(express.urlencoded({ extended: true}))// old way working with url

// app.get only for get request, e.g. get json database 
// app.use for other middleware/method 

app.listen(PORT, ()=>{
    console.log(`App listening at http://localhost:${PORT}`)
})

