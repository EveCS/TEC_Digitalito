const express = require('express');
const neo4j = require('neo4j-driver');

const app = express();
const driver = neo4j.driver('bolt://127.0.0.1:7687', neo4j.auth.basic('neo4j', '12345678'));

//GETS

//Obtiene todos los chats de una persona. Si el usuario genera una conversación con otro, aunque no tenga mensajes aún, también vendría acá
app.get('/chats/participants', (req, res) => {
  const chatName = req.query.chatName;
  const session = driver.session();

  session
    .run(
      `
      MATCH (c:Chat {nombre: $chatName})-[:PARTICIPANTE]->(u:Usuario)
      RETURN u.nombre as participante
      `,
      { chatName }
    )
    .then((result) => {
      const participants = result.records.map(record => record.get('participante'));
      res.json(participants);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener participantes del chat' });
    })
    .finally(() => {
      session.close();
    });
});



app.get('/getChats', (req, res) => {
  const username = req.query.username;
  const session = driver.session();

  session
    .run(
      `
      MATCH (u:Usuario {nombre: $username})<-[:PARTICIPANTE]-(c:Chat)-[:TIENE_MENSAJE]->(m:Mensaje)
      RETURN c.nombre, m.contenido, m.fecha
      `,
      { username }
    )
    .then((result) => {
      const data = result.records.map(record => {
        return {
          chat: record.get('c.nombre'),
          contenido: record.get('m.contenido'),
          fecha: record.get('m.fecha').toString() // Convierte la fecha a una cadena
        };
      });
      res.json(data);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener chats y mensajes' });
    })
    .finally(() => {
      session.close();
    });
});


app.post('/enviarMensaje', (req, res) => {
  const nombreUsuario1 = req.query.nombreUsuario1;
  const nombreUsuario2 = req.query.nombreUsuario2;
  const contenidoMensaje = req.query.contenidoMensaje;
  const session = driver.session();

  session
    .run(
      `
      MERGE (u1:Usuario {nombre: $nombreUsuario1})
      MERGE (u2:Usuario {nombre: $nombreUsuario2})
      MERGE (chat:Chat {nombre: u1.nombre + ' y ' + u2.nombre})
      MERGE (mensaje:Mensaje {contenido: $contenidoMensaje, fecha: datetime()})
      MERGE (u1)-[:ENVIADO]->(mensaje)-[:RECIBIDO]->(u2)
      MERGE (chat)-[:PARTICIPANTE]->(u1)
      MERGE (chat)-[:PARTICIPANTE]->(u2)
      MERGE (chat)-[:TIENE_MENSAJE]->(mensaje)
      RETURN chat, mensaje, u1, u2;
      `,
      { nombreUsuario1, nombreUsuario2, contenidoMensaje }
    )
    .then((result) => {
      const records = result.records;
      const chat = records[0].get('chat').properties;
      const mensaje = records[0].get('mensaje').properties;
      const u1 = records[0].get('u1').properties;
      const u2 = records[0].get('u2').properties;
      res.json({ chat, mensaje, u1, u2 });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'Error al crear el chat y los nodos asociados' });
    })
    .finally(() => {
      session.close();
    });
});


app.listen(3004, () => {
  console.log('API de Chat escuchando en el puerto 3004');
});
