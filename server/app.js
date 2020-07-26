const express = require('express');

// cross domain functionality
const cors = require('cors');

// use to access env file which contains hostname and port that the app will use
const dotenv = require('dotenv');
dotenv.config();

const dbService = require('./dbService');

const app = express();
app.use(cors());

// need for processing post and put process

app.use(express.json());
app.use(express.urlencoded({extended: false }));



// create
app.post('/insert', (request, response) => 
{
    const { name } = request.body;
    const db = dbService.getDbServiceInstance();

    const result = db.insertNewName(name);

    result
    .then(data => response.json({data: data}))
    .catch(err => console.log(err));
}); 

// read
app.get('/getALL', (request, response) => 
{
    const db = dbService.getDbServiceInstance();

    const result = db.getAllData();

    result
    .then(data => response.json({data: data}))
    .catch(err => console.log(err));
}); 

// update


// delete
app.delete('/delete/:id', (request, response) =>
{
    const { id } = request.params;

    const db = dbService.getDbServiceInstance();

    const result = db.deleteRowbyID(id);

    result
    .then(data => response.json({success: data}))
    .catch(err => console.log(err));
})



app.listen(process.env.PORT, () => 
{
    console.log("Application is running on this server...");
});