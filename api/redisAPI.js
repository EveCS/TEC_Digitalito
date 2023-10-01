const express = require('express');
const app = express();
const redis= require('./redis.js'); 
const cors = require('cors');  

app.use(cors()); // cors sec

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// get user dado username
app.get('/getUser', async (req, res) => {
    try {
        const username = req.query.username;
        const user = await redis.getUser(username);
        res.send(user);
    } catch (error) {
        console.error('Error al obtener el usuario:', error);
        res.status(500).send('Error al obtener el usuario');
    }
});
// edit user, funciona 1 parametro a la vez, ej dado un  username edito un param,
app.post('/editUserField', async (req, res) => { 
    try {
        const { username, field, value } = req.query;
        await redis.editUserField(username, field, value);
        res.send('User field updated successfully');
    } catch (error) {
        console.error('Error al editar el campo del usuario:', error);
        res.status(500).send('Error al editar el campo del usuario');
    }
});
// add user dado username, password, fullName, dob, avatarURL y es_profesor bool
app.post('/insertUser', async (req, res) => { 
    try {
        const { username, password, full_name, dob, avatar_url,es_profesor } = req.query;
        await redis.insertUser(username, password, full_name, dob, avatar_url, es_profesor);
        res.send('User inserted successfully');
    } catch (error) {
        console.error('Error al insertar el usuario:', error);
        res.status(500).send('Error al insertar el usuario');
    }
});

app.post('/addFriend', async (req, res) => {
    try {
        const { username, friendUsername } = req.query;
        await redis.updateFriendList(username, friendUsername);
        res.send("  ${friendUsername} se a;adio a   ${username}");
    } catch (error) {
        console.error('Error al añadir amigo:', error);
        res.status(500).send('Error al añadir amigo');
    }
});

app.get('/getFriends', async (req, res) => {
    try {
        const { username} = req.query;
        friendlist = await redis.getFriendList(username);
        res.send(friendlist);
    } catch (error) {
        console.error('Error al añadir amigo:', error);
        res.status(500).send('Error al añadir amigo');
    }
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
 