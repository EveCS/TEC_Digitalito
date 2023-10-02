const mongoose = require('mongoose');
// Mi esquema con la definicion de la estructura de los cursos
const courseSchema = new mongoose.Schema({

    codigo: String,
    nombre: String,
    descripcion: String,
    fechaInicio: Date,
    fechaFin: Date,
    foto: String,
    publicado: Boolean,
    username: String

});
const Course = mongoose.model('courses', courseSchema);

const temaschema = new mongoose.Schema(
    {

        id_seccion: String,
        codigo: String,
        nombre: String,
        descripcion: String,

    }
)
const Tema = mongoose.model('temas', temaschema);

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
const Info = mongoose.model('infos', infoSchema);

const evaluationSchema = new mongoose.Schema({
    _id: String,
    id_curso: String,
    nombre: String,
    fechaInicio: Date,
    fechaFinal: Date,
    opcionesCorrectas: Array,
    preguntas: [{
        pregunta: Array,
        opciones: Array
    }]
});

const Evaluation = mongoose.model('evaluations', evaluationSchema);

const sectionSchema = new mongoose.Schema(
    {
        
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

const subtemaschema = new mongoose.Schema(
    {

        id_tema: String,
        codigo: String,
        nombre: String,
        descripcion: String,

    }
)
const SubTema = mongoose.model('subtemas', subtemaschema);

module.exports = {
    Course: Course,
    Tema: Tema,
    Info: Info,
    Evaluation: Evaluation,
    Section: Section,
    SubTema: SubTema
};