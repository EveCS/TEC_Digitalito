


const addMyEndPointstoApp = (app, mongoose) => {
    // Mi esquema con la definicion de la estructura de los cursos
    const courseSchema = new mongoose.Schema({
        _id: String,
        codigo: String,
        nombre: String,
        descripcion: String,
        fechaInicio: Date,
        fechaFin: Date,
        foto: String,

    });
    const Course = mongoose.model('courses', courseSchema);

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
    return app;
}

module.exports = {
    addMyEndPointstoApp,
};