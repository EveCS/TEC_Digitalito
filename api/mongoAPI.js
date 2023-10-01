const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
let app = express();

const CursosEndpoints = require('./mongo/cursos');
const EvaluacionesEndpoints = require('./mongo/eval');
const SeccionEndpoints = require('./mongo/seccion');
const TemasEndpoints = require('./mongo/temas');


app.use(express.json());
app.use(cors());

app = CursosEndpoints.addMyEndPointstoApp(app, mongoose);
app = EvaluacionesEndpoints.addMyEndPointstoApp(app, mongoose);
app = SeccionEndpoints.addMyEndPointstoApp(app, mongoose);
app = TemasEndpoints.addMyEndPointstoApp(app, mongoose);

const port = process.env.PORT || 3001;
app.listen(port, async () => {
    console.log(`Servidor iniciado en el puerto ${port}`);
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/proyecto');
    }
    catch (e) {
        console.log(`No pude conectar a mongodb://127.0.0.1:27017/proyecto` + e);
    }
}
);


