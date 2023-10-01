// CursoService.js
import axios from 'axios';

const BASE_URL = 'http://localhost:3001'; // Change this to your server's URL

let CursoService = {
    obtenerCursos: async () => {
        const response = await axios.get(`${BASE_URL}/cursos`);
        return response.data;
    },

    agregarCurso: async (curso) => {
        const response = await axios.post(`${BASE_URL}/cursos`, curso);
        return response.data;
    },

    editarCurso: async (id, curso) => {
        const response = await axios.put(`${BASE_URL}/cursos/${id}`, curso);
        return response.data;
    },

    eliminarCurso: async (id) => {
        const response = await axios.delete(`${BASE_URL}/cursos/${id}`);
        return response.data;
    }
};



const EvaluacionService = {
    obtenerEvaluaciones: async () => {
        const response = await axios.get(`${BASE_URL}/Evaluaciones`);
        return response.data;
    },

    obtenerEvaluacionesByCurso: async (id) => {
        const response = await axios.get(`${BASE_URL}/evaluacionesByCurso/${id}`);
        return response.data;
    },

    agregarEvaluacion: async (evaluacion) => {
        const response = await axios.post(`${BASE_URL}/evaluaciones`, evaluacion);
        return response.data;
    },

    editarEvaluaciones: async (id, evaluacion) => {
        const response = await axios.put(`${BASE_URL}/Evaluaciones/${id}`, evaluacion);
        return response.data;
    },

    eliminarEvaluacion: async (id) => {
        const response = await axios.delete(`${BASE_URL}/Evaluaciones/${id}`);
        return response.data;
    }
};

const SeccionService = {
    obtenerSecciones: async () => {
        const response = await axios.get(`${BASE_URL}/secciones`);
        return response.data;
    },

    obtenerSeccionesByCurso: async (id) => {
        const response = await axios.get(`${BASE_URL}/cursos/${id}`);
        return response.data.secciones;
    },

    agregarSeccion: async (cursoId, seccion) => {
        const response = await axios.post(`${BASE_URL}/cursos/${cursoId}/secciones`, seccion);
        return response.data;
    },

    editarSeccion: async (cursoId, seccionId, seccion) => {
        const response = await axios.put(`${BASE_URL}/cursos/${cursoId}/secciones/${seccionId}`, seccion);
        return response.data;
    },

    eliminarSeccion: async (cursoId, seccionId) => {
        const response = await axios.delete(`${BASE_URL}/cursos/${cursoId}/secciones/${seccionId}`);
        return response.data;
    }
};

const PreguntaService = {
    obtenerPreguntas: async () => {
        const response = await axios.get(`${BASE_URL}/preguntas`);
        return response.data;
    },

    obtenerPreguntasByEvaluacion: async (evaluacionId) => {
        const response = await axios.get(`${BASE_URL}/evaluaciones/${evaluacionId}/preguntas`);
        return response.data;
    },

    agregarPregunta: async (evaluacionId, pregunta) => {
        const response = await axios.post(`${BASE_URL}/evaluaciones/${evaluacionId}/preguntas`, pregunta);
        return response.data;
    },

    editarPregunta: async (evaluacionId, preguntaId, pregunta) => {
        const response = await axios.put(`${BASE_URL}/evaluaciones/${evaluacionId}/preguntas/${preguntaId}`, pregunta);
        return response.data;
    },

    eliminarPregunta: async (evaluacionId, preguntaId) => {
        const response = await axios.delete(`${BASE_URL}/evaluaciones/${evaluacionId}/preguntas/${preguntaId}`);
        return response.data;
    }
};



export default {
    EvaluacionService,
    CursoService,
    SeccionService,
    PreguntaService
};
