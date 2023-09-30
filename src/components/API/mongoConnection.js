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
    }
};



const Evaluacioneservice = {
    obtenerEvaluaciones: async () => {
        const response = await axios.get(`${BASE_URL}/Evaluaciones`);
        return response.data;
    },

    agregarEvaluaciones: async (evaluacion) => {
        const response = await axios.post(`${BASE_URL}/Evaluaciones`, evaluacion);
        return response.data;
    },

    editarEvaluaciones: async (id, evaluacion) => {
        const response = await axios.put(`${BASE_URL}/Evaluaciones/${id}`, evaluacion);
        return response.data;
    },

    eliminarEvaluaciones: async (id) => {
        const response = await axios.delete(`${BASE_URL}/Evaluaciones/${id}`);
        return response.data;
    }
};

export default 
{Evaluacioneservice,

 CursoService}
