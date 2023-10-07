require('dotenv').config()
const cors = require('cors');


const express = require('express');
const app= express();

const connectToDb = require('./config/db.js');
connectToDb();

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors());

const userRoutes = require('./routes/userRoutes.js')
app.use('/',userRoutes);

module.exports= app;

