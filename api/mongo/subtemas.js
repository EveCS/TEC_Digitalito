
const addMyEndPointstoApp = (app, mongoose) => {
    const subtemaschema = new mongoose.Schema(
        {

            id_tema: String,
            codigo: String,
            nombre: String,
            descripcion: String,

        }
    )
    const subtema = mongoose.model('subtemas', subtemaschema);

    app.post('/subtemasbyTema/:id', async (req, res) => {
        try {
            const subtemas2 = req.body;

            if (!Array.isArray(subtemas2)) {
                throw new Error('subtemas2 should be an array');
            }

            const curso = await subtema.findOne({ _id: req.params.id });

            // Check if curso.subtemas exists, if not, create it as an empty array
            if (!curso.subtemas) {
                curso.subtemas = [];
            }

            curso.subtemas.push(...subtemas2);

            await curso.save();

            res.status(200).json(curso.subtemas);
        } catch (error) {
            console.error(error);
            res.status(500).send(error.message);
        }
    });

    // Create a new ev
    app.post('/SubTemas', async (req, res) => {
        try {
            console.log(req.body);
            const newEv = new subtema(req.body);
            await newEv.save();
            res.status(201).json(newEv);
        } catch (error) {
            console.error(error);
            res.status(500).send(error.message);
        }
    });

    app.get('/subtemasByTema/:id', async (req, res) => {
        try {
            console.log(req.params.id);
            const subtemas = await subtema.find({ id_tema: req.params.id });
            console.log(subtemas);
            res.status(200).json(subtemas);
        } catch (error) {
            console.error(error);
            res.status(500).send(error.message);
        }
    });
    // Delete (DELETE)
    app.delete('/subtemas/:id', async (req, res) => {
        try {
            const deletedEvaluation = await subtema.findByIdAndDelete(req.params.id);
            if (!deletedEvaluation) {
                res.status(404).send("subtema not found");
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