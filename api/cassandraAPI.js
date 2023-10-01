const express = require('express');
const cassandra = require('cassandra-driver');
const cors = require('cors');  


const app = express();
app.use(cors()); // cors sec
const client = new cassandra.Client({ 
    contactPoints: ['127.0.0.1:32768'], 
    localDataCenter: 'datacenter1', 
    keyspace: 'matricula' 
  });
  
  client.connect()
  .then(() => {
    console.log('Connected to Cassandra');
  })
  .catch(err => {
    console.error('Error connecting to Cassandra', err);
  });


app.use(express.json());

app.get('/estudiantesCurso', (req, res) => {
    const query = 'SELECT * FROM estudiantes_curso';
    client.execute(query, [], { prepare: true }, (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(result.rows);
      }
    });
  });
  
  app.post('/insertEstudiantesCurso', (req, res) => {
    const { estudiante_username, curso_id } = req.query;
    const query = 'INSERT INTO estudiantes_curso (estudiante_username, curso_id, fecha) VALUES (?, ?, toTimestamp(now()))';
    const params = [estudiante_username, curso_id];

    client.execute(query, params, { prepare: true }, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ message: 'Estudiante Curso inserted successfully' });
        }
    });
});


app.get('/getPorCurso', (req, res) => {
  const { curso_id } = req.query;
  const query = 'SELECT * FROM estudiantes_curso WHERE curso_id = ? ALLOW FILTERING';
  const params = [curso_id];

  client.execute(query, params, { prepare: true }, (err, result) => {
      if (err) {
          res.status(500).json({ error: err.message });
      } else {
          res.json(result.rows);
      }
  });
});

app.get('/getPorUser', (req, res) => {
  const { estudiante_username } = req.query;
  const query = 'SELECT * FROM estudiantes_curso WHERE estudiante_username = ? ALLOW FILTERING';
  const params = [estudiante_username];

  client.execute(query, params, { prepare: true }, (err, result) => {
      if (err) {
          res.status(500).json({ error: err.message });
      } else {
          res.json(result.rows);
      }
  });
});



  app.listen(3001, () => {
    console.log('Server is running on http://localhost:3002');
  });
  
