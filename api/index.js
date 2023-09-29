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
    nombre: String,
    creditos: Number
});

const evaluationSchema = new mongoose.Schema({
    _id: String,
    nombre: String,
    descripcion: String,
    fechaInicio: String,
    fechaFinal: String,
    archivos: {
        nombre: String,
        direccion: String,
    }
});

const matriculaSchema = new mongoose.Schema({
    _id: String,
    username: String,
    course_id: String,
    date: String,
    result: String,
});

// Mi modelo usando el esquema anterior 
const Course = mongoose.model('courses', courseSchema);
const Evaluation = mongoose.model('evaluations', courseSchema);
const Matricula = mongoose.model('matriculas', courseSchema);

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
        console.log("id " + courseId);
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
        console.log("id " + courseId);
        console.log("request body " + req.body);
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


// Create (POST)
app.post('/evaluaciones', async (req, res) => {
    try {
        const newEvaluation = await Evaluation.create(req.body);
        res.status(201).json(newEvaluation);
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

// Create (POST)
app.post('/matriculas', async (req, res) => {
    try {
        const newMatricula = await Matricula.create(req.body);
        res.status(201).json(newMatricula);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
});

// Read All (GET)
app.get('/matriculas', async (req, res) => {
    try {
        const matriculas = await Matricula.find({});
        res.status(200).json(matriculas);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
});

// Read by ID (GET)
app.get('/matriculas/:id', async (req, res) => {
    try {
        const matricula = await Matricula.findById(req.params.id);
        if (!matricula) {
            res.status(404).send("Matricula not found");
        } else {
            res.status(200).json(matricula);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
});

// Update (PUT)
app.put('/matriculas/:id', async (req, res) => {
    try {
        const updatedMatricula = await Matricula.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedMatricula) {
            res.status(404).send("Matricula not found");
        } else {
            res.status(200).json(updatedMatricula);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
});

// Delete (DELETE)
app.delete('/matriculas/:id', async (req, res) => {
    try {
        const deletedMatricula = await Matricula.findByIdAndDelete(req.params.id);
        if (!deletedMatricula) {
            res.status(404).send("Matricula not found");
        } else {
            res.status(200).json(deletedMatricula);
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


