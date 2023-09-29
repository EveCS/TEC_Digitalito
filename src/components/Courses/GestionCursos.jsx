// GestionCursos.js

import React, { Fragment, useEffect, useState } from "react";
import CursoService from "../API/mongoConnection";
import GestionEvaluaciones from "./Evaluations";
import GestionMatriculas from "./Registration";

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
  async function agregarCurso() {
    try {

      // Add the curso
      await CursoService.agregarCurso(cursoForm);


      // Clear the curso form
      setCursoForm({
        _id: "",
        nombre: "",
        creditos: "",
      });

      // Fetch the updated list of cursos
      getCursos();
    } catch (error) {
      console.error(error);
    }
  }

  // Add or edit a curso
  async function EditarCurso() {
    try {

      // Edit the curso
      let editC = await CursoService.editarCurso(cursoForm._id, cursoForm);

      // Clear the curso form
      setCursoForm({
        _id: "",
        nombre: "",
        creditos: "",
      });

      // Fetch the updated list of cursos
      getCursos();
    } catch (error) {
      alert(error);
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
            <tr key={curso._id}>
              <td><a href={`/gestionCursos/${curso._id}`}>{curso._id}</a></td>
              <td>{curso.nombre}</td>
              <td>{curso.creditos}</td>
              <td>
                <button onClick={() => setCursoForm(curso)}>Editar</button>
                <button onClick={() => eliminarCurso(curso._id)}>Eliminar</button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>

      <h2>Agregar/Editar Curso</h2>
      <input
        type="text"
        placeholder="ID"
        value={cursoForm._id}
        onChange={(e) => setCursoForm({ ...cursoForm, _id: e.target.value })}
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

      <button onClick={EditarCurso}>Editar Curso</button>



      <button onClick={() => agregarCurso()}>Agregar Nuevo</button>


    </Fragment>
  );
};

export default GestionCursos;