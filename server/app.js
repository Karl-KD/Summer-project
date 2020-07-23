const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended : false }));

// create
app.post('/insert', (request, response) => 
{

}); 

// read
app.get('/getALL', (request, response) => 
{
    console.log('test');
}); 

// update


// delete