const express = require('express');
const neo4j = require('neo4j-driver');

const app = express();
const driver = neo4j.driver('bolt://127.0.0.1:7687', neo4j.auth.basic('neo4j', '12345678'));

app.get('/chats', (req, res) => {
    const session = driver.session();
  
    session
      .run('MATCH (c:Chat) RETURN c')
      .then((result) => {
        const chats = result.records.map(record => record.get('c').properties);
        res.json(chats);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener chats' });
      })
      .finally(() => session.close());
  });

app.listen(3004, () => {
  console.log('API de Chat escuchando en el puerto 3004');
});
