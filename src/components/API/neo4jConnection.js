const neo4j = require('neo4j-driver');
const driver = neo4j.driver('bolt://127.0.0.1', neo4j.auth.basic('neo4j', '12345678'));
const session = driver.session();
const curr_user = 'Luis Alejandro';
let selected_name = null;

function getIndex(req, res) {
    session
        .run('MATCH(n:Person{Name:"' + curr_user + '"}) RETURN n')
        .then(function(result){
            // ...
            res.render('index', {
                user: userArr,
                friends: friendsArr,
                text: textArr,
                selected_chat: selected_name
            });
        })
        .catch(function(err){
            console.log(err);
        });
}

function postChat(req, res) {
    selected_name = req.body.ddl_friends;
    res.redirect('/');
}

function getChat(req, res) {
    session
        .run('MATCH(p:Person{Name:"' + curr_user + '"})-[:Participates]->(c:Conversation)<-[:Participates]-(p2:Person) RETURN p2')
        .then(function(result2){
            // ...
            res.render('index', {
                user: userArr,
                friends: friendsArr,
                text: textArr,
                selected_chat: selected_name
            });
        })
        .catch(function(err){
            console.log(err);
        });
}

function postMessage(req, res) {
    var msg = req.body.chat_msg;

    session
        .run('MATCH(p1:Person{Name:"' + curr_user + '"})-[:Participates]->(c:Conversation)<-[:Participates]-(p2:Person{Name:"' + selected_name + '"}) CREATE(p1)-[:Sends]->(m:Message{Text:"' + curr_user + ': ' + msg + '", DateTime: datetime()})-[:Belongs]->(c)')
        .then(function(result){
            res.redirect('/');
        })
        .catch(function(err){
            console.log(err);
        });
}

module.exports = {
    getIndex,
    postChat,
    getChat,
    postMessage
};