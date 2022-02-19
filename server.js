const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const path = require('path');
const noteData = require('./db/db.json')
const fs = require('fs')
const  { v4: uuidv4 }= require ('uuid')
//GET /notes should return the notes.html file.

app.use(express.json());

app.use(express.urlencoded({extended:true}))

app.use(express.static('public'))

app.get('/notes', (req,res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('/api/notes', (req,res) => {
  res.json(noteData)
});

app.post('/api/notes', (req,res) => {
    
    console.log (req)
    let note ={
        title: req.body.title,
        text: req.body.text,
        id: uuidv4() 
        
    }
    console.log(note)
    fs.readFile('./db/db.json','utf8',(err, data) => {
        if (err) throw err
        let savedNotes = JSON.parse(data)
        savedNotes.push(note)
        fs.writeFile('./db/db.json',JSON.stringify(savedNotes), err =>{
            if (err) throw err
            
            res.send(savedNotes);
            console.log (savedNotes);
        })
    })
    

})

app.get('*', (req,res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});






app.listen(PORT, () => console.log('Express Server on port 3001!'));