// GestionCursos.js

import React, { Fragment, useEffect, useState } from "react";
import CursoService from "../API/mongoConnection";


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
              <td><a href={`/adminCurso/${curso._id}`}>{curso.codigo}</a></td>
              <td>{curso.nombre}</td>
              <td>{curso.descripcion}</td>
              <td>{curso.fechaInicio}</td>
              <td>{curso.fechaFin}</td>
              <td><img src={curso.foto} alt={`Foto de ${curso.nombre}`} /></td>
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
        placeholder="Código"
        value={cursoForm.codigo}
        onChange={(e) => setCursoForm({ ...cursoForm, codigo: e.target.value })}
      />
      <input
        type="text"
        placeholder="Nombre"
        value={cursoForm.nombre}
        onChange={(e) => setCursoForm({ ...cursoForm, nombre: e.target.value })}
      />
      <textarea
        placeholder="Descripción"
        value={cursoForm.descripcion}
        onChange={(e) => setCursoForm({ ...cursoForm, descripcion: e.target.value })}
      />
      <input
        type="date"
        placeholder="Fecha de Inicio"
        value={cursoForm.fechaInicio}
        onChange={(e) => setCursoForm({ ...cursoForm, fechaInicio: e.target.value })}
      />
      <input
        type="date"
        placeholder="Fecha de Fin (opcional)"
        value={cursoForm.fechaFin}
        onChange={(e) => setCursoForm({ ...cursoForm, fechaFin: e.target.value })}
      />
      <input
        type="text"
        placeholder="URL de la Foto"
        value={cursoForm.foto}
        onChange={(e) => setCursoForm({ ...cursoForm, foto: e.target.value })}
      />

      <button onClick={EditarCurso}>Editar Curso</button>
      <button onClick={() => agregarCurso()}>Agregar Nuevo</button>
    </Fragment>
  );
};

export default GestionCursos;