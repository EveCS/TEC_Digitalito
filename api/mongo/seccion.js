
const addMyEndPointstoApp = (app, mongoose) => {
    const sectionSchema = new mongoose.Schema(
        {
            _id: String,
            id_curso: String,
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
    )
    const Section = mongoose.model('sections', sectionSchema);
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

    // Create a new ev
    app.post('/secciones', async (req, res) => {
        try {
            console.log(req.body);
            const newEv = new Section(req.body);
            await newEv.save();
            res.status(201).json(newEv);
        } catch (error) {
            console.error(error);
            res.status(500).send(error.message);
        }
    });

    app.get('/seccionesByCurso/:id', async (req, res) => {
        try {
            const sections = await Section.find({ id_curso: req.params.id });
            res.status(200).json(sections);
        } catch (error) {
            console.error(error);
            res.status(500).send(error.message);
        }
    });
    // Delete (DELETE)
    app.delete('/secciones/:id', async (req, res) => {
        try {
            const deletedEvaluation = await Section.findByIdAndDelete(req.params.id);
            if (!deletedEvaluation) {
                res.status(404).send("Section not found");
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