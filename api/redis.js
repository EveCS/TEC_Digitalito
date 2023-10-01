const redis = require('ioredis');


const client = redis.createClient({
    host: 'localhost',
    port: 6379, 
});

function getUser(key) {
            return new Promise(function (resolve, reject) {
                client.hgetall(key, (error, data) => {
                    if (error) {
                        console.error(`Error al recuperar datos de ${key}:`, error);
                        reject(error);
                    } else {
                        resolve(data);
                    }
                });
            });
    }
    


    function editUserField(key, field, value) {
        return new Promise(function (resolve, reject) {
            client.hset(key, field, value, (error, result) => {
                if (error) {
                    console.error(`Error al editar campo ${field} para ${key}:`, error);
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
    }
    function insertUser(username, password, full_name, dob, avatar_url, es_profesor) {
        return new Promise(function (resolve, reject) {
            client.hset(username, 'username', username, 'password', password, 'full_name', full_name, 'dob', dob, 'avatar_url', avatar_url, "es_profesor", es_profesor, (error, result) => {
                if (error) {
                    console.error(`Error al insertar usuario ${username}:`, error);
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
    }
    function getFriendList(username) {
        return new Promise(function (resolve, reject) {
            client.lrange(`${username}_friends`, 0, -1, (error, result) => {
                if (error) {
                    console.error(`Error al obtener la lista de amigos para ${username}:`, error);
                    reject(error);
                } else {
                    resolve(result ? result : []);
                }
            });
        });
    }
    

    function updateFriendList(username, friendUsername) {
        return new Promise(function (resolve, reject) {
            client.rpush(`${username}_friends`, friendUsername, (error, result) => {
                if (error) {
                    console.error(`Error al añadir amigo a ${username}'s friend list:`, error);
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
    }
    
    module.exports = {
        getUser,
        editUserField,
        insertUser,
        getFriendList,
        updateFriendList
    };