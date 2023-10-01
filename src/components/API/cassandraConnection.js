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


export {
  getCursosbyUser,
  matricularCurso
};