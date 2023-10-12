const express = require('express');
const app= express();
const cors = require('cors');

const connectToDb = require('./config/db.js');
const cookieParser = require('cookie-parser');

require('dotenv').config(
    { path: './.env' }
)
const bcrypt= require('bcryptjs');

connectToDb();

app.use(express.json())
app.use(cookieParser()); // to parse the cookie
app.use(express.urlencoded({extended:true}))
app.use(cors());

app.use(express.urlencoded({ extended: true }))
const userRoutes = require('./routes/userRoutes.js')
app.use('/',userRoutes);

module.exports= app;

