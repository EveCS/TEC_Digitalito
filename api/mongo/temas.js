
const addMyEndPointstoApp = (app, mongoose) => {
    const temaschema = new mongoose.Schema(
        {

            id_seccion: String,
            codigo: String,
            nombre: String,
            descripcion: String,

        }
    )
    const Tema = mongoose.model('temas', temaschema);
    app.post('/temasbySeccion/:id', async (req, res) => {
        try {
            const temas2 = req.body;

            if (!Array.isArray(temas2)) {
                throw new Error('temas2 should be an array');
            }

            const curso = await Course.findOne({ _id: req.params.id });

            // Check if curso.temas exists, if not, create it as an empty array
            if (!curso.temas) {
                curso.temas = [];
            }

            curso.temas.push(...temas2);

            await curso.save();

            res.status(200).json(curso.temas);
        } catch (error) {
            console.error(error);
            res.status(500).send(error.message);
        }
    });

    // Create a new ev
    app.post('/temas', async (req, res) => {
        try {
            console.log(req.body);
            const newEv = new Tema(req.body);
            await newEv.save();
            res.status(201).json(newEv);
        } catch (error) {
            console.error(error);
            res.status(500).send(error.message);
        }
    });

    app.get('/temasBySeccion/:id', async (req, res) => {
        try {
            console.log("Temas" + req.params.id);
            const temas = await Tema.find({ id_seccion: req.params.id });
            res.status(200).json(temas);
        } catch (error) {
            console.error(error);
            res.status(500).send(error.message);
        }
    });
    // Delete (DELETE)
    app.delete('/temas/:id', async (req, res) => {
        try {
            const deletedEvaluation = await Tema.findByIdAndDelete(req.params.id);
            if (!deletedEvaluation) {
                res.status(404).send("Tema not found");
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