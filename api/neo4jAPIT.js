var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var neo4j = require('neo4j-driver');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

var driver = neo4j.driver('bolt://127.0.0.1', neo4j.auth.basic('neo4j', '12345678'));
var session = driver.session();
var curr_user = 'Luis Alejandro'

app.get('/chats', function(req, res){
    session
        .run('MATCH(p:Person{Name:"' + curr_user + '"})-[:Participates]->(c:Conversation)<-[:Participates]-(p2:Person) RETURN p2')
        .then(function(result){
            res.json(result);
        })        
        .catch(function(err){
            console.log(err);
        });
    
});

app.post('/chat', function(req, res){
});

app.post('/message', function(req, res){
});

app.listen(3007);
console.log('Server Started on Port 3007');

module.exports = app;