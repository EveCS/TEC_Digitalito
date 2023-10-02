
const addMyEndPointstoApp = (app, SubTema) => {


    app.post('/SubTemasbyTema/:id', async (req, res) => {
        try {
            const SubTemas2 = req.body;

            if (!Array.isArray(SubTemas2)) {
                throw new Error('SubTemas2 should be an array');
            }

            const curso = await SubTema.findOne({ _id: req.params.id });

            // Check if curso.SubTemas exists, if not, create it as an empty array
            if (!curso.SubTemas) {
                curso.SubTemas = [];
            }

            curso.SubTemas.push(...SubTemas2);

            await curso.save();

            res.status(200).json(curso.SubTemas);
        } catch (error) {
            console.error(error);
            res.status(500).send(error.message);
        }
    });

    // Create a new ev
    app.post('/SubTemas', async (req, res) => {
        try {

            const newEv = new SubTema(req.body);
            await newEv.save();
            res.status(201).json(newEv);
        } catch (error) {
            console.error(error);
            res.status(500).send(error.message);
        }
    });

    app.get('/SubTemasByTema/:id', async (req, res) => {
        try {

            const SubTemas = await SubTema.find({ id_tema: req.params.id });

            res.status(200).json(SubTemas);
        } catch (error) {
            console.error(error);
            res.status(500).send(error.message);
        }
    });
    // Delete (DELETE)
    app.delete('/SubTemas/:id', async (req, res) => {
        try {
            const deletedEvaluation = await SubTema.findByIdAndDelete(req.params.id);
            if (!deletedEvaluation) {
                res.status(404).send("SubTema not found");
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