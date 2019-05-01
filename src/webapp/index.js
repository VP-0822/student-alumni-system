const express = require('express');
const bodyParser = require('body-parser');
const path=require('path');
const mongoose= require('mongoose');
const neo4j = require('neo4j-driver').v1;
const database = require('./config/database');

//Connect mongoDB
mongoose.connect(database.mongodb);

//Connect Neo4J
driver = neo4j.driver(database.neo4j, neo4j.auth.basic(database.neo4j_username, database.neo4j_password));


const app= express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.set('views', path.join(__dirname, 'views'));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname, 'public')));

let homePage = require('./routes/home');
app.use('/', homePage);

//define routes for literature
let messages = require('./routes/userChat');
app.use('/userChat', messages);

//start server
app.listen(3000, function(){
    console.log('I am listening....')
});