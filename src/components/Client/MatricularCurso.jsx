import React, { useState } from "react";
import { matricularCurso } from "../API/cassandraConnection"; 
import { useNavigate, useLocation } from "react-router-dom";
import connect from '../API/mongoConnection';

export function MatricularCurso() {
  const [cursoName, setCursoName] = useState("");
  const location = useLocation();
  const username = location.state.usuario;

  const [existeCurso, setExisteCurso] = useState([]);

  const fetchCurso = async () => {
      try {
          const response = await connect.CursoService.obtenerCursosPorID(cursoName);
          setExisteCurso("false");
      } catch (error) {
          console.error('Error al obtener matrícula:', error);
      }
  };


  const handleMatricular = async () => {
    fetchCurso();

    if (existeCurso!="false"){
    try {
      // call de api
      const response = await matricularCurso(username,cursoName);
      
    } catch (error) {
      console.error("Error matriculando curso:", error);
      // el  error
    }
  }
  else{
    alert("Curso no existe");
    setExisteCurso("");
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
