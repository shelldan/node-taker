const express = require('express')

//Import our modular router for /notes
const notesRouter = require('./notes');

const app = express();


// dealing with /api/notes (see server.js, the root is '/api')
// localhost:3001/api/notes 
app.use('/notes', notesRouter); 

module.exports = app;