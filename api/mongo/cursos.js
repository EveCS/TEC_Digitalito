

const addMyEndPointstoApp = (app, mongoose, Course, Section, Tema, SubTema) => {


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

    app.post('/duplicarCurso/:id', async (req, res) => {
        try {
            // Step 1: Duplicate the Curso
            const newCurso = new Course(req.body);
            await newCurso.save();

            const courseId = req.params.id;

            // Step 2: Duplicate Sections
            const sections = await Section.find({ id_curso: courseId });

            const duplicatedSections = sections.map(section => ({

                ...section.toObject(),
                duplicatedFrom: section._id,
                _id: new mongoose.Types.ObjectId(),
                id_curso: newCurso._id,

            }));

            for (const dupsection of duplicatedSections) {
                dupsection.id_curso = newCurso._id;
                // Here i need to find the sections temas to duplicate in the new section
                const temas = await Tema.find({ id_seccion: dupsection.duplicatedFrom });

                dupsection.temas = temas;
            }

            await Section.insertMany(duplicatedSections);

            // Step 3: Duplicate Temas
            for (const section of duplicatedSections) {

                const duplicatedTemas = section.temas.map(tema => ({
                    ...tema.toObject(),
                    duplicatedFrom: tema._id,
                    _id: new mongoose.Types.ObjectId(),
                    id_seccion: section._id
                }));

                await Tema.insertMany(duplicatedTemas);

                // Step 4: Duplicate Subtemas
                for (const duptema of duplicatedTemas) {
                    const subtemas = await SubTema.find({ id_tema: duptema.duplicatedFrom });
                    const duplicatedSubtemas = subtemas.map(subtema => ({
                        ...subtema.toObject(),
                        duplicatedFrom: subtema._id,
                        _id: new mongoose.Types.ObjectId(), // Generate a new _id
                        id_tema: duptema._id // Set the tema_id to the new tema's _id
                    }));
                    console.log("Duplicated Sub Temas :" + duplicatedSubtemas);
                    await SubTema.insertMany(duplicatedSubtemas);
                }
            }

            res.status(201).json(newCurso);
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
    // Assuming you have required necessary dependencies and defined your 'Course' model
    // Define a route to update the 'publicado' property of a course
    app.put('/publicarCurso/:id', async (req, res) => {
        try {
            // Extract the course ID from the request parameters
            const courseId = req.params.id;

            // Find and update the course based on its ID
            const updatedCourse = await Course.findOneAndUpdate({ _id: courseId }, req.body, { new: true });

            // If the course was not found, respond with a 404 error
            if (!updatedCourse) {
                res.status(404).send('Course not found');
                return;
            }

            // Set the 'publicado' property to true in the updated course object
            updatedCourse.publicado = true;

            // Save the updated course
            await updatedCourse.save();

            // Respond with a JSON representation of the updated course
            res.status(200).json(updatedCourse);
        } catch (error) {
            // Handle any potential errors (e.g., database errors, validation errors)
            console.error(error);
            res.status(500).send(error.message);
        }
    });
    // Define a route to update the 'publicado' property of a course
    app.put('/despublicarCurso/:id', async (req, res) => {
        try {
            // Extract the course ID from the request parameters
            const courseId = req.params.id;

            // Find and update the course based on its ID
            const updatedCourse = await Course.findOneAndUpdate({ _id: courseId }, req.body, { new: true });

            // If the course was not found, respond with a 404 error
            if (!updatedCourse) {
                res.status(404).send('Course not found');
                return;
            }

            // Set the 'publicado' property to true in the updated course object
            updatedCourse.publicado = false;

            // Save the updated course
            await updatedCourse.save();

            // Respond with a JSON representation of the updated course
            res.status(200).json(updatedCourse);
        } catch (error) {
            // Handle any potential errors (e.g., database errors, validation errors)
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