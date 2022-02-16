const express = require('express');
const app = express();
const PORT = 3001;
const path = require('path');
//GET /notes should return the notes.html file.

app.get('/notes', (req,res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/api/notes', (req,res) => {
    res.json
})



app.listen(3001, () => console.log('Express Server on port 3001!'));