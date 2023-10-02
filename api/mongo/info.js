const multer = require('multer');
const addMyEndPointstoApp = (app, mongoose) => {
    const infoSchema = new mongoose.Schema(
        {

            id_ref: String,
            codigo: String,
            nombre: String,
            descripcion: String,
            file: String,
            filename: String
        }
    )
    const info = mongoose.model('infos', infoSchema);
    app.post('/infosByRef/:id', async (req, res) => {
        try {
            const infos2 = req.body;

            if (!Array.isArray(infos2)) {
                throw new Error('infos2 should be an array');
            }

            const curso = await Course.findOne({ id_ref: req.params.id });

            // Check if curso.infos exists, if not, create it as an empty array
            if (!curso.infos) {
                curso.infos = [];
            }

            curso.infos.push(...infos2);

            await curso.save();

            res.status(200).json(curso.infos);
        } catch (error) {
            console.error(error);
            res.status(500).send(error.message);
        }
    });


    const upload = multer({ dest: 'uploads/' });

    // Create a new ev
    app.post('/infoFileUpload', upload.single('file'), async (req, res) => {
        try {


            const newInfo = new info({
                descripcion: req.body.descripcion,
                file: req.file.filename
            });
            await newInfo.save();
            res.status(201).json(newInfo);
        } catch (error) {
            console.error(error);
            res.status(500).send(error.message);
        }
    });

    // Create a new ev
    app.post('/info', async (req, res) => {
        try {
            const newEv = new info(req.body);
            await newEv.save();
            res.status(201).json(newEv);
        } catch (error) {
            console.error(error);
            res.status(500).send(error.message);
        }
    });

    app.get('/infoByRef/:id', async (req, res) => {
        try {
            const infos = await info.find({ id_ref: req.params.id });
            res.status(200).json(infos);
        } catch (error) {
            console.error(error);
            res.status(500).send(error.message);
        }
    });
    // Delete (DELETE)
    app.delete('/infos/:id', async (req, res) => {
        try {
            const deletedEvaluation = await info.findByIdAndDelete(req.params.id);
            if (!deletedEvaluation) {
                res.status(404).send("info not found");
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