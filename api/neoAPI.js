const express = require('express');
const neo4j = require('neo4j-driver');

const app = express();
const driver = neo4j.driver('bolt://127.0.0.1:7687', neo4j.auth.basic('neo4j', '12345678'));

const cors = require('cors');

app.use(cors()) // Use this after the variable declaration

//GETS

//Obtiene todos los chats de una persona. Si el usuario genera una conversación con otro, aunque no tenga mensajes aún, también vendría acá
app.get('/chats', (req, res) => {
  const { name } = req.query;
  const session = driver.session();
  
  session
    .run('MATCH(p:Usuario{Nombre:"' + name + '"})<-[:PARTICIPANTE]-(c:Chat)-[:PARTICIPANTE]->(p2:Usuario) RETURN p2')
    .then((result) => {
      const chats = result.records.map(record => record.get('p2').properties);
      res.json(chats);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener chats' });
    })
    .finally(() => session.close());
});

//Obtiene todos los mensajes del chat seleccionado usando el nombre de la segunda persona
app.get('/msgsbychat', (req, res) => {
  const { name, receiver } = req.query;
  const session = driver.session();

  session
    .run('MATCH(p1:Usuario{Nombre:"' + name + '"})<-[:PARTICIPANTE]-(c:Chat)-[:PARTICIPANTE]->(p2:Usuario{Nombre:"' + receiver + '"}) MATCH(m:Mensaje)<-[:TIENE_MENSAJE]-(c) RETURN m ORDER BY m.DateTime')
    .then((result) => {
      const msgs = result.records.map(record => record.get('m').properties);
      res.json(msgs);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener los mensajes de texto' });
    })
    .finally(() => session.close());
});

//POST

//Envía mensajes al chat, crea los usuarios y el chat si no existen 
app.post('/envia_msj', (req, res) => {
  const { name, receiver, msg } = req.query;
  const session = driver.session();

  session
    .run('MERGE(p1:Usuario{Nombre:"' + name + '"}) MERGE(p2:Usuario{Nombre:"' + receiver + '"}) MERGE(chat:Chat{Nombre:"Chat entre ' + name + ' y ' + receiver + '"}) MERGE(mensaje:Mensaje{Contenido:"' + msg + '", Fecha: datetime()}) MERGE(p1)-[:ENVIADO]->(mensaje)-[:RECIBIDO]->(p2) MERGE(chat)-[:PARTICIPANTE]->(p1) MERGE(chat)-[:PARTICIPANTE]->(p2) MERGE(chat)-[:TIENE_MENSAJE]->(mensaje)')
    .then((result) => {
      res.json({ message: 'Mensaje enviado exitosamente' });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'Error al enviar el mensaje' });
    })
    .finally(() => session.close());
});



app.listen(3004, () => {
  console.log('API de Chat escuchando en el puerto 3004');
});
