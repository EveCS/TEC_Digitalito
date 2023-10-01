// CursoService.js
import axios from 'axios';

const BASE_URL = 'http://localhost:3001'; // Change this to your server's URL

const CursoService = {
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
    },

    publicarCurso: async (id) => {
        const response = await axios.put(`${BASE_URL}/publicarCurso/${id}`);
        return response.data;
    },
    despublicarCurso: async (id) => {
        const response = await axios.put(`${BASE_URL}/despublicarCurso/${id}`);
        return response.data;
    },

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
    },
    eliminarEvaluacion: async (idEvaluacion, idCurso) => {
        const response = await axios.delete(`${BASE_URL}/evaluacionesByID/${idEvaluacion}/curso/${idCurso}`);

        return response.data;
    },
};

const SeccionService = {
    obtenerSecciones: async () => {
        const response = await axios.get(`${BASE_URL}/secciones`);
        return response.data;
    },

    obtenerSeccionesByCurso: async (id) => {
        const response = await axios.get(`${BASE_URL}/seccionesByCurso/${id}`);
        return response.data;
    },

    agregarSeccion: async (seccion) => {
        const response = await axios.post(`${BASE_URL}/secciones`, seccion);
        return response.data;
    },

    editarSeccion: async (cursoId, seccionId, seccion) => {
        const response = await axios.put(`${BASE_URL}/secciones/${seccionId}`, seccion);
        return response.data;
    },

    eliminarSeccion: async (id) => {
        const response = await axios.delete(`${BASE_URL}/secciones/${id}`);
        return response.data;
    }
};

const TemaService = {
    obtenerTemas: async () => {
        const response = await axios.get(`${BASE_URL}/temas`);
        return response.data;
    },

    obtenerTemaBySeccion: async (id) => {
        console.log(id);
        const response = await axios.get(`${BASE_URL}/temasBySeccion/${id}`);
        return response.data;
    },

    obtenerTemaById: async (temaId) => {
        const response = await axios.get(`${BASE_URL}/temas/${temaId}`);
        return response.data;
    },

    agregarTema: async (tema) => {
        const response = await axios.post(`${BASE_URL}/temas`, tema);
        return response.data;
    },

    editarTema: async (temaId, tema) => {
        const response = await axios.put(`${BASE_URL}/temas/${temaId}`, tema);
        return response.data;
    },

    eliminarTema: async (temaId) => {
        const response = await axios.delete(`${BASE_URL}/temas/${temaId}`);
        return response.data;
    }
};


const services = {
    EvaluacionService,
    CursoService,
    SeccionService,
    TemaService
};

export default services;
