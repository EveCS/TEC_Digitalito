// GestionCursos.js

import React, { Fragment, useEffect, useState } from "react";
import CursoService from "../../services/CursoService";

const GestionCursos = () => {
  const [cursos, setCursos] = useState([]);
  const [cursoForm, setCursoForm] = useState({
    _id: "",
    nombre: "",
    creditos: "",
  });

  // Fetch the list of cursos when the component mounts
  useEffect(() => {
    getCursos();
  }, []);

  // Fetch the list of cursos
  async function getCursos() {
    try {
      const data = await CursoService.obtenerCursos();
      setCursos(data);
    } catch (error) {
      console.error(error);
    }
  }

  // Add or edit a curso
  async function agregarOEditarCurso() {
    try {
      if (cursoForm._id) {
        // Edit the curso
        await CursoService.editarCurso(cursoForm._id, cursoForm);
      } else {
        // Add the curso
        await CursoService.agregarCurso(cursoForm);
      }

      // Clear the curso form
      setCursoForm({
        id: "",
        nombre: "",
        creditos: "",
      });

      // Fetch the updated list of cursos
      getCursos();
    } catch (error) {
      console.error(error);
    }
  }

  // Delete a curso
  async function eliminarCurso(id) {
    try {
      await CursoService.eliminarCurso(id);
      getCursos();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Fragment>
      <h1>Lista de Cursos</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Creditos</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {cursos.map((curso) => (
            <tr key={curso.id}>
              <td>{curso._id}</td>
              <td>{curso.nombre}</td>
              <td>{curso.creditos}</td>
              <td>
                <button onClick={() => setCursoForm(curso)}>Editar</button>
                <button onClick={() => eliminarCurso(curso.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Agregar/Editar Curso</h2>
      <input
        type="text"
        placeholder="ID"
        value={cursoForm.id}
        onChange={(e) => setCursoForm({ ...cursoForm, id: e.target.value })}
      />
      <input
        type="text"
        placeholder="Nombre"
        value={cursoForm.nombre}
        onChange={(e) => setCursoForm({ ...cursoForm, nombre: e.target.value })}
      />
      <input
        type="text"
        placeholder="Creditos"
        value={cursoForm.creditos}
        onChange={(e) => setCursoForm({ ...cursoForm, creditos: e.target.value })}
      />
      <button onClick={agregarOEditarCurso}>Agregar/Editar Curso</button>
    </Fragment>
  );
};

export default GestionCursos;