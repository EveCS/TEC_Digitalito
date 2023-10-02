import React, { useState, useEffect } from 'react';
import axios from 'axios';


const getCursosbyUser = async (username) => {
  try {
    const response = await axios.get(`http://localhost:3002/getPorUser?estudiante_username=${username}`)
    return (response.data)
  } catch (error) {
    console.log("Error al buscar el usuario", error);
  }
}

const matricularCurso = async (username,curso) => {
    try {
      const response = await axios.post(`http://localhost:3002/insertEstudiantesCurso?estudiante_username=${username}&curso_id=${curso}`)
      return (response.data)
    } catch (error) {
      console.log("Error al buscar el usuario", error);
    }
  }

  //http://localhost:3001/getPorCurso?curso_id=curso2

  const getPorCurso = async (curso) => {
    try {
      const response = await axios.get(`http://localhost:3002/getPorCurso?curso_id=${curso}`)
      console.log(curso+"<---");
      return (response.data)
    } catch (error) {
      console.log("Error al buscar el usuario", error);
    }
  }

  const insertNota = async (username,curso,nota) => {
  try {
    const response = await axios.post(`http://localhost:3002/insertNota?estudiante_username=${username}&curso_id=${curso}&nota=${nota}`)
    return (response.data)
  } catch (error) {
    console.log("Error al buscar el usuario", error);
  }
}
export {
  getCursosbyUser,
  matricularCurso,
  getPorCurso,
  insertNota
};