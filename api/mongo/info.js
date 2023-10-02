
const addMyEndPointstoApp = (app, Info) => {

    app.post('/InfosByRef/:id', async (req, res) => {
        try {
            const Infos2 = req.body;

            if (!Array.isArray(Infos2)) {
                throw new Error('Infos2 should be an array');
            }

            const curso = await Course.findOne({ id_ref: req.params.id });

            // Check if curso.Infos exists, if not, create it as an empty array
            if (!curso.Infos) {
                curso.Infos = [];
            }

            curso.Infos.push(...Infos2);

            await curso.save();

            res.status(200).json(curso.Infos);
        } catch (error) {
            console.error(error);
            res.status(500).send(error.message);
        }
    });

    // Create a new ev
    app.post('/Info', async (req, res) => {
        try {
            const newEv = new Info(req.body);
            await newEv.save();
            res.status(201).json(newEv);
        } catch (error) {
            console.error(error);
            res.status(500).send(error.message);
        }
    });

    app.get('/InfoByRef/:id', async (req, res) => {
        try {
            const Infos = await Info.find({ id_ref: req.params.id });
            res.status(200).json(Infos);
        } catch (error) {
            console.error(error);
            res.status(500).send(error.message);
        }
    });
    // Delete (DELETE)
    app.delete('/Infos/:id', async (req, res) => {
        try {
            const deletedEvaluation = await Info.findByIdAndDelete(req.params.id);
            if (!deletedEvaluation) {
                res.status(404).send("Info not found");
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