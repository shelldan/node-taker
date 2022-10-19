//express.Router() function is used to create a new router object in your program to handle requests.
const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readFromFile, writeToFile, readAndAppend } = require('../helpers/fsUtils')

// Get Route for retrieving all the note
notes.get('/',(req, res) => 
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
);

// Post Route for submitting note 
notes.post('/', (req, res) => {
    //Destructuring assignment for the items in req.body
    //when we want to make a post, we can attach the information that we to post to this req(object), and with this req(object), there's another object called body(object), we could create a json (where we could put information in insomnia and that's the information we want to send up)
    //question, why destructuring? what is req.body? (see index.js, line 36 saveNote, and line 74 saveNote(newNote) and line 70 newNote = {title: noteTitle.value, text: noteText.value} )
    const {title, text } = req.body;

    //If all the required properties are present
    if (title && text){
        //variable for the object we will save
        const newNote = {
            title,
            text,
            id: uuidv4(),
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

// Delete Route for deleting note
notes.delete('/:id', (req, res) => {
    console.log('delete')
    //params = url = /:id (pass in the url, instead of the body) 
    //question: why req.params.id
    //deconstruct the id off from the params, that's how we pull the value in /:id
    console.log(req.params)
    const { id } = req.params;
    console.log(id)

    //notes already in json file
    //readFromFile is a Promise function, and .then must be used. 
    readFromFile('./db/db.json').then((data)=>{

        const currentNotes = JSON.parse(data);
        console.log(currentNotes)

        //if the id exist
        if(id){
            //newNoteData = currentNotes - deleteNote (by filter out deleteNote id)
            //return a newNoteData by filter out the deleteNote id 
            const newNoteData = currentNotes.filter(currentNotes => currentNotes.id !== id)

            writeToFile('./db/db.json',newNoteData)

            const response = {
                status: 'delete',
                body: newNoteData,
            }

            res.json(response)        
        }else{
            res.json('Error on deleting note')
        }

    }) 
})


module.exports = notes;