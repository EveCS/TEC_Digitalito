const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');

app.use(express.json());
app.use(cors());


////////////////////////////////////////////////////

// Mi esquema con la definicion de la estructura de los cursos
const courseSchema = new mongoose.Schema({
    _id: String,
    codigo: String,
    nombre: String,
    descripcion: String,
    fechaInicio: Date,
    fechaFin: Date,
    foto: String,
    evaluaciones: [
        {
            _id: String,
            codigo: String,
            nombre: String,
            descripcion: String,
            fechaInicio: Date,
            fechaFinal: Date,
            archivos: {
                nombre: String,
                direccion: String,
            }
        }
    ],
    secciones: [
        {
            _id: String,
            codigo: String,
            nombre: String,
            descripcion: String,
        }
    ],
});



// Mi modelo usando el esquema anterior 
const Course = mongoose.model('courses', courseSchema);
const Evaluation = mongoose.model('evaluations', courseSchema);


/////////////////////////////////////////////////////
// Obtener todos los cursos
// ...
app.get('/cursos', async (req, res) => {

    try {
        res.status(200);
        res.json(await Course.find({}));
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
});

// Create a new course
app.post('/cursos', async (req, res) => {
    try {
        const newCourse = new Course(req.body);
        await newCourse.save();
        res.status(201).json(newCourse);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
});

// Get a specific course by ID
app.get('/cursos/:id', async (req, res) => {
    try {
        const courseId = req.params.id;

        const course = await Course.findOne({ _id: courseId });
        if (!course) {
            res.status(404).send('Course not found');
            return;
        }

        res.status(200).json(course);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
});

// Update a course by ID
app.put('/cursos/:id', async (req, res) => {
    try {
        const courseId = req.params.id;

        const updatedCourse = await Course.findOneAndUpdate({ _id: courseId }, req.body, { new: true });

        if (!updatedCourse) {
            res.status(404).send('Course not found');
            return;
        }
        res.status(200).json(updatedCourse);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
});

// Delete a course by ID
app.delete('/cursos/:id', async (req, res) => {
    try {
        const courseId = req.params.id;
        const deletedCourse = await Course.findOneAndDelete({ _id: courseId });
        if (!deletedCourse) {
            res.status(404).send('Course not found');
            return;
        }
        res.status(200).json(deletedCourse);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
});



// Read All (GET)
app.get('/evaluaciones', async (req, res) => {
    try {
        const evaluations = await Evaluation.find({});
        res.status(200).json(evaluations);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
});


// Obtener Evaluaciones de Un Curso 
app.get('/evaluacionesByCurso/:id', async (req, res) => {
    try {
        const curso = await Course.findOne({ _id: req.params.id });

        if (!curso) {
            return res.status(404).json({ message: 'Curso not found' });
        }

        if (!curso.evaluaciones || curso.evaluaciones.length === 0) {
            return res.status(404).json({ message: 'No evaluaciones available for this curso' });
        }

        res.status(200).json(curso.evaluaciones);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
});

app.get('/evaluacionesByID/:idEval/curso/:idCurso', async (req, res) => {
    try {
        const curso = await Course.findOne({ _id: req.params.idCurso });


        if (!curso) {
            return res.status(404).json({ message: 'Curso not found' });
        }

        const evaluacion = curso.evaluaciones.find(e => e._id.toString() === req.params.idEval);

        if (!evaluacion) {
            return res.status(404).json({ message: 'Evaluacion not found for this curso' });
        }

        res.status(200).json(evaluacion);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
});



// Obtener Secciones  de Un Curso 
app.get('/seccionesByCurso/:id', async (req, res) => {
    try {
        const curso = await Course.findOne({ _id: req.params.id });

        if (!curso) {
            return res.status(404).json({ message: 'Curso not found' });
        }

        if (!curso.secciones || curso.secciones.length === 0) {
            return res.status(404).json({ message: 'No secciones available for this curso' });
        }

        res.status(200).json(curso.secciones);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
});

// Incluir Evaluaciones a un Curso
app.post('/evaluacionesByCurso/:id', async (req, res) => {
    try {
        const evaluaciones2 = req.body;

        if (!Array.isArray(evaluaciones2)) {
            throw new Error('Evaluaciones2 should be an array');
        }

        const curso = await Course.findOne({ _id: req.params.id });

        // Check if curso.evaluaciones exists, if not, create it as an empty array
        if (!curso.evaluaciones) {
            curso.evaluaciones = [];
        }

        curso.evaluaciones.push(...evaluaciones2);

        await curso.save();
        res.status(200).json(curso.evaluaciones);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
});

//Incluir secciones a un curso
app.post('/seccionesByCurso/:id', async (req, res) => {
    try {
        const secciones2 = req.body;

        if (!Array.isArray(secciones2)) {
            throw new Error('secciones2 should be an array');
        }

        const curso = await Course.findOne({ _id: req.params.id });

        // Check if curso.secciones exists, if not, create it as an empty array
        if (!curso.secciones) {
            curso.secciones = [];
        }

        curso.secciones.push(...secciones2);

        await curso.save();

        res.status(200).json(curso.secciones);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
});


// Read by ID (GET)
app.get('/evaluaciones/:id', async (req, res) => {
    try {
        const evaluation = await Evaluation.findById(req.params.id);
        if (!evaluation) {
            res.status(404).send("Evaluation not found");
        } else {
            res.status(200).json(evaluation);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
});

// Update (PUT)
app.put('/evaluaciones/:id', async (req, res) => {
    try {
        const updatedEvaluation = await Evaluation.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedEvaluation) {
            res.status(404).send("Evaluation not found");
        } else {
            res.status(200).json(updatedEvaluation);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
});

// Delete (DELETE)
app.delete('/evaluaciones/:id', async (req, res) => {
    try {
        const deletedEvaluation = await Evaluation.findByIdAndDelete(req.params.id);
        if (!deletedEvaluation) {
            res.status(404).send("Evaluation not found");
        } else {
            res.status(200).json(deletedEvaluation);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
});



const port = process.env.PORT || 3001;
app.listen(port, async () => {
    console.log(`Servidor iniciado en el puerto ${port}`);
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/proyecto');
    }
    catch (e) {
        console.log(`No pude conectar a mongodb://127.0.0.1:27017/db`);
    }
}
);


