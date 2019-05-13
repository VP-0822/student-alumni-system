const express = require('express');
const bodyParser = require('body-parser');
const path=require('path');
const mongoose= require('mongoose');
const neo4j = require('neo4j-driver').v1;
const database = require('./config/database');
var redis = require('redis');

//Connect mongoDB
mongoose.connect(database.mongodb);

//Connect redis
//var client = redis.createClient(database.redis_port, database.redis_host);


//Connect Neo4J
driver = neo4j.driver(database.neo4j, neo4j.auth.basic(database.neo4j_username, database.neo4j_password));
session = driver.session();

const app= express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.set('views', path.join(__dirname, 'views'));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname, 'public')));

let homePage = require('./routes/home');
app.use('/', homePage);

//define routes for channels
let channel = require('./routes/channels');
app.use('/channel', channel);


//define routes for literature
let messages = require('./routes/userChat');
app.use('/userChat', messages);

//define routes for user events
let events = require('./routes/userNodes');
app.use('/users', events);

let progressReport = require('./routes/progressReport');
app.use('/report', progressReport);

let userDomain = require('./routes/userDomain');
app.use('/domain', userDomain);


let userFieldSearch = require('./routes/userFieldSearch');
app.use('/search',userFieldSearch );

let userDocument = require('./routes/documents');
app.use('/document', userDocument);

let friends = require('./routes/friends');
app.use('/friends',friends);

//start server
app.listen(3000, function(){
    console.log('I am listening....')
});