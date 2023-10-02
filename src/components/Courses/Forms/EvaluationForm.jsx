// GestionCursos.js

import React, { Fragment, useEffect, useState } from "react";
import connect from "../../API/mongoConnection";
import '../style.css'

const EvaluationForm = ({ id2, EvaluacionForm, getEvaluacionesByCurso, setEvaluacionForm }) => {


  // Add or edit a curso
  async function agregarEvaluacion() {
    try {

      // Add the curso
      await connect.EvaluacionService.agregarEvaluacion(EvaluacionForm);


      // Clear the curso form
      setEvaluacionForm({
        _id: "",
        id_curso: id2,
        codigo: "",
        nombre: "",
        descripcion: "",
        fechaInicio: "",
        fechaFinal: "",
        archivos: {
          nombre: "",
          direccion: ""
        }
      });

      // Fetch the updated list of cursos
      getEvaluacionesByCurso(id2);
    } catch (error) {
      console.error(error);
    }
  }

  // Add or edit a curso
  async function EditarEvaluacion() {
    try {

      // Edit the curso
      let editC = await connect.EvaluacionService.editarEvaluaciones(EvaluacionForm._id, EvaluacionForm);

      // Clear the curso form
      setEvaluacionForm({
        _id: "",
        codigo: "",
        nombre: "",
        descripcion: "",
        fechaInicio: "",
        fechaFinal: "",
        archivos: {
          nombre: "",
          direccion: ""
        }
      });

      // Fetch the updated list of cursos
      getEvaluacionesByCurso(id2);
    } catch (error) {
      alert(error);
    }
  }

  return (
    <Fragment>

      <h2>Agregar Evaluación</h2>


      <div className="form-grid">
        <div className="input-group">
          <label>ID</label>
          <input
            type="text"
            placeholder="ID"
            value={EvaluacionForm._id}
            onChange={(e) => setEvaluacionForm({ ...EvaluacionForm, _id: e.target.value })}
          />
        </div>

        <div className="input-group">
          <label>Código</label>
          <input
            type="text"
            placeholder="Código"
            value={EvaluacionForm.codigo}
            onChange={(e) => setEvaluacionForm({ ...EvaluacionForm, codigo: e.target.value })}
          />
        </div>

        <div className="input-group">
          <label>Nombre</label>
          <input
            type="text"
            placeholder="Nombre"
            value={EvaluacionForm.nombre}
            onChange={(e) => setEvaluacionForm({ ...EvaluacionForm, nombre: e.target.value })}
          />
        </div>

        <div className="input-group">
          <label>Descripción</label>
          <textarea
            placeholder="Descripción"
            value={EvaluacionForm.descripcion}
            onChange={(e) => setEvaluacionForm({ ...EvaluacionForm, descripcion: e.target.value })}
          />
        </div>

        <div className="input-group">
          <label>Fecha de Inicio</label>
          <input
            type="date"
            placeholder="Fecha de Inicio"
            value={EvaluacionForm.fechaInicio}
            onChange={(e) => setEvaluacionForm({ ...EvaluacionForm, fechaInicio: e.target.value })}
          />
        </div>

        <div className="input-group">
          <label>Fecha de Fin (opcional)</label>
          <input
            type="date"
            placeholder="Fecha de Fin (opcional)"
            value={EvaluacionForm.fechaFinal}
            onChange={(e) => setEvaluacionForm({ ...EvaluacionForm, fechaFinal: e.target.value })}
          />
        </div>

        <div className="input-group">
          <label>Nombre del Archivo</label>
          <input
            type="text"
            placeholder="Nombre del Archivo"
            value={EvaluacionForm.archivos.nombre}
            onChange={(e) =>
              setEvaluacionForm({
                ...EvaluacionForm,
                archivos: { ...EvaluacionForm.archivos, nombre: e.target.value }
              })
            }
          />
        </div>

        <div className="input-group">
          <label>Dirección del Archivo</label>
          <input
            type="text"
            placeholder="Dirección del Archivo"
            value={EvaluacionForm.archivos.direccion}
            onChange={(e) =>
              setEvaluacionForm({
                ...EvaluacionForm,
                archivos: { ...EvaluacionForm.archivos, direccion: e.target.value }
              })
            }
          />
        </div>
      </div>
      <div className="button-links">
        <button onClick={EditarEvaluacion}>Editar Evaluacion</button>
        <button onClick={agregarEvaluacion}>Agregar Nuevo</button>
      </div>
    </Fragment>

  );
};

export default EvaluationForm;