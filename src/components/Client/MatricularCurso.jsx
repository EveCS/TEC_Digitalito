import React, { useState } from "react";
import { matricularCurso } from "../API/cassandraConnection"; 
import { useNavigate, useLocation } from "react-router-dom";
import connect from '../API/mongoConnection';

export function MatricularCurso() {
  const [cursoName, setCursoName] = useState("");
  const location = useLocation();
  const username = location.state.usuario;
  const [nombresCursos, setNombresCursos] = useState([]);
  const [cursosData, setCursosData] = useState([]);
  const [existeCurso, setExisteCurso] = useState(false); // Changed to boolean

  const fetchCurso = async () => {
    try {
        const response = await connect.CursoService.obtenerCursos(); // Se asume que esto es asíncrono
        setCursosData(response);
        const nombres = response.map(curso => curso.nombre);
        setNombresCursos(nombres);
    } catch (error) {
        console.error('Error al obtener matrícula:', error);
    }
  };

  const handleMatricular = async () => {
    await fetchCurso();
    const cursoExists = nombresCursos.includes(cursoName);
    console.log(nombresCursos);
    console.log(cursoName);
  
    if (cursoExists) {
      try {
        await matricularCurso(username, cursoName);
      } catch (error) {
        console.error("Error matriculando curso:", error);
      }
    } else {
      alert("Curso no existe");
    }
  };

  return (
    <div className="p-3 mb-2 bg-dark vh-100">
      <div className="jumbotron justify-content-center w-25 mx-auto my-2">
        <h2 className="fw-bold mb-5 text-center text-white">Matricular Curso</h2>
        <div className="form-floating mx-5 my-2">
          <input
            type="text"
            className="form-control"
            id="cursoNameInput"
            placeholder="Nombre del Curso"
            value={cursoName}
            onChange={(e) => setCursoName(e.target.value)}
          />
          <label htmlFor="cursoNameInput">Nombre del Curso</label>
        </div>
        <button onClick={handleMatricular} className="w-100 btn btn-lg btn-primary">Matricular</button>
      </div>
    </div>
  );
};
