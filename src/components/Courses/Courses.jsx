// GestionCursos.js

import React, { Fragment, useEffect, useState } from "react";
import connect from "../API/mongoConnection";

import './style.css'
import CursosForm from "./Forms/CoursesForm";
import { set } from "mongoose";

const GestionCursos = () => {
  const [cursos, setCursos] = useState([]);
  const [cursoForm, setCursoForm] = useState({
    _id: "",
    codigo: "",
    nombre: "",
    descripcion: "",
    fechaInicio: "",
    fechaFin: "",
    foto: "",
  });

  // Fetch the list of cursos when the component mounts
  useEffect(() => {
    getCursos();

  }, []);

  // Fetch the list of cursos
  async function getCursos() {
    try {
      const data = await connect.CursoService.obtenerCursos();
      setCursos(data);
    } catch (error) {
      console.error(error);
    }
  }


  // Delete a curso
  async function eliminarCurso(id) {
    try {
      await connect.CursoService.eliminarCurso(id);
      getCursos();
    } catch (error) {
      console.error(error);
    }
  }


  return (
    <Fragment>
      <h2 className="button-links">Lista de Cursos</h2>

      <table className="table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Código</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Fecha Inicio</th>
            <th>Fecha Fin</th>
            <th>Foto</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {cursos.map((curso) => (
            <tr key={curso._id}>
              <td>
                <a href={`/adminCurso/${curso._id}`} target="_blank" rel="noopener noreferrer">
                  <i className="fa fa-external-link"></i> {/* Add your icon class here */}

                  {curso._id}
                </a>
              </td>

              <td>{curso.codigo}</td>
              <td>{curso.nombre}</td>
              <td>{curso.descripcion}</td>
              <td>{curso.fechaInicio}</td>
              <td>{curso.fechaFin}</td>
              <td><img src={`data:image/png;base64,${curso.foto}`}
                alt={`Foto de ${curso.nombre}`} className="img-resize" /></td>
              <td>
                <button onClick={() => setCursoForm(curso)}>Editar</button>
                <button onClick={() => eliminarCurso(curso._id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <CursosForm cursoForm={cursoForm} getCursos={getCursos} setCursoForm={setCursoForm} />

    </Fragment>

  );
};

export default GestionCursos;