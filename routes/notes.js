//express.Router() function is used to create a new router object in your program to handle requests.
const notes = require('express').Router();
const { readAndAppend, readFromFile } = require('../helpers/fsUtils')

// Get Route for retrieving all the note
notes.get('/',(req, res) => 
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
);

// Post Route for submitting feedback 
notes.post('/', (req, res) => {
    //Destructuring assignment for the items in req.body
    const {title, text } = req.body;

    //If all the required properties are present
    if (title && text){
        //variable for the object we will save
        const newNote = {
            title,
            text,
        };

        readAndAppend(newNote, './db/db.json')
            
        const response = {
            status: 'success',
            body: newNote,
        };

        res.json(response);
    }else{
        res.json('Error in posting note')
    }
});

module.exports = notes;