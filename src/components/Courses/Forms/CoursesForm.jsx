// GestionCursos.js

import React, { Fragment, useEffect, useState } from "react";
import connect from "../../API/mongoConnection";
import '../style.css';

const CursosForm = ({ cursoForm, getCursos, setCursoForm, username }) => {
  // dar estilo al texto en la tabla
  const estiloDeTexto = { align: "center", color: "White", };


  // Add or edit a curso
  async function agregarCurso() {
    try {

      // Add the curso
      await connect.CursoService.agregarCurso(cursoForm);


      // Clear the curso form
      setCursoForm({

        codigo: "",
        nombre: "",
        descripcion: "",
        fechaInicio: "",
        fechaFin: "",
        foto: "",
        publicado: false,
        username: username
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
      let editC = await connect.CursoService.editarCurso(cursoForm._id, cursoForm);

      // Clear the curso form
      setCursoForm({

        codigo: "",
        nombre: "",
        descripcion: "",
        fechaInicio: "",
        fechaFin: "",
        foto: "",
        publicado: false,
        username: username
      });

      // Fetch the updated list of cursos
      getCursos();
    } catch (error) {
      alert(error);
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
      <div className="bg-dark ">

        <h2 style={estiloDeTexto} className="button-links">Editar / Agregar Cursos </h2>
        <div className="form-container">
          <div className="form-grid">

            <div className="input-group">
              <label style={estiloDeTexto} >Código</label>
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
                value={cursoForm.fechaInicio ? cursoForm.fechaInicio.split('T')[0] : ''}
                onChange={(e) => setCursoForm({ ...cursoForm, fechaInicio: e.target.value })}
              />
            </div>

            <div className="input-group">
              <label>Fecha de Fin (opcional)</label>
              <input
                type="date"
                placeholder="Fecha de Fin (opcional)"
                value={cursoForm.fechaFin ? cursoForm.fechaFin.split('T')[0] : ''}
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
                <img className="img-resize" src={`data:image/png;base64,${cursoForm.foto}`} alt="Uploaded" />
              )}
            </div>
          </div>
        </div>

        <div className="button-links">
          <button onClick={EditarCurso} className="btn btn-lg btn-primary ">Editar Curso</button> &nbsp;
          <button onClick={() => agregarCurso()} className="btn btn-lg btn-primary">Agregar Nuevo</button>
        </div>
      </div>
    </Fragment>

  );
};

export default CursosForm;