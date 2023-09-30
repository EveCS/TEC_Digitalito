// GestionCursos.js

import React, { Fragment, useEffect, useState } from "react";
import CursoService from "../API/mongoConnection";
import './style.css'

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

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const base64String = reader.result.split(',')[1];
      setCursoForm({ ...cursoForm, foto: base64String });
    };

    reader.readAsDataURL(file);
  };

  return (
    <Fragment>
      <h2>Lista de Cursos</h2>

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
      <h2>Editar / Agregar Cursos </h2>
      <div className="form-grid">
        <div className="input-group">
          <label>ID</label>
          <input
            type="text"
            placeholder="ID"
            value={cursoForm._id}
            onChange={(e) => setCursoForm({ ...cursoForm, _id: e.target.value })}
          />
        </div>

        <div className="input-group">
          <label>Código</label>
          <input
            type="text"
            placeholder="Código"
            value={cursoForm.codigo}
            onChange={(e) => setCursoForm({ ...cursoForm, codigo: e.target.value })}
          />
        </div>

        <div className="input-group">
          <label>Nombre</label>
          <input
            type="text"
            placeholder="Nombre"
            value={cursoForm.nombre}
            onChange={(e) => setCursoForm({ ...cursoForm, nombre: e.target.value })}
          />
        </div>

        <div className="input-group">
          <label>Descripción</label>
          <textarea
            placeholder="Descripción"
            value={cursoForm.descripcion}
            onChange={(e) => setCursoForm({ ...cursoForm, descripcion: e.target.value })}
          />
        </div>

        <div className="input-group">
          <label>Fecha de Inicio</label>
          <input
            type="date"
            placeholder="Fecha de Inicio"
            value={cursoForm.fechaInicio}
            onChange={(e) => setCursoForm({ ...cursoForm, fechaInicio: e.target.value })}
          />
        </div>

        <div className="input-group">
          <label>Fecha de Fin (opcional)</label>
          <input
            type="date"
            placeholder="Fecha de Fin (opcional)"
            value={cursoForm.fechaFin}
            onChange={(e) => setCursoForm({ ...cursoForm, fechaFin: e.target.value })}
          />
        </div>


        <div className="input-group">
          <label>Subir Foto</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
          />
          {cursoForm.foto && (
            <img src={`data:image/png;base64,${cursoForm.foto}`} alt="Uploaded" />
          )}
        </div>
      </div>


      <div className="button-links">
        <button onClick={EditarCurso}>Editar Curso</button>
        <button onClick={() => agregarCurso()}>Agregar Nuevo</button>
      </div>
    </Fragment>

  );
};

export default GestionCursos;