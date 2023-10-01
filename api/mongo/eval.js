




const addMyEndPointstoApp = (app, mongoose) => {
    const evaluationSchema = new mongoose.Schema({
        _id: String,
        id_curso: String,
    nombre: String,
    fechaInicio: Date,
    fechaFinal: Date,
    preguntas: [
        {
            pregunta: String,
            opciones: [String]
        }
    ],
    opcionesCorrectas: [String]

    });

    const Evaluation = mongoose.model('evaluations', evaluationSchema);
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


    // Create a new ev
    app.post('/evaluaciones', async (req, res) => {
        try {
            console.log(req.body);
            const newEv = new Evaluation(req.body);
            await newEv.save();
            res.status(201).json(newEv);
        } catch (error) {
            console.error(error);
            res.status(500).send(error.message);
        }
    });

    // Read All (GET)
    app.get('/evaluacionesByCurso/:id', async (req, res) => {
        try {
            const evaluations = await Evaluation.find({ id_curso: req.params.id });
            res.status(200).json(evaluations);
        } catch (error) {
            console.error(error);
            res.status(500).send(error.message);
        }
    });



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

    return app;
}

module.exports = {
    addMyEndPointstoApp,
};