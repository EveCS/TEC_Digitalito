// GestionCursos.js

import React, { Fragment, useEffect, useState } from "react";
import connect from "../../API/mongoConnection";
import '../style.css'

const SectionForm = ({ id, getSeccionesByCurso, SeccionForm, setSeccionForm }) => {


  async function agregarSeccion() {
    try {
      // Intenta agregar una nueva evaluación utilizando el servicio Seccioneservice y los datos de SeccionForm.
      await connect.SeccionService.agregarSeccion(id.id, SeccionForm);
      // limpia las Secciones luego de agregarlas
      setSeccionForm({
        _id: "",
        nombre: "",
        descripcion: "",
        fechaInicio: "",
        fechaFinal: "",
        archivos: {
          nombre: "",
          direccion: ""
        }
      });
      // Llama a la función getSecciones para actualizar la lista de Secciones.
      getSeccionesByCurso(id);
    } catch (error) {
      console.error(error);
    }
  }

  async function editarSeccion() {
    try {
      await connect.SeccionService.editarSeccion(SeccionForm._id, SeccionForm);
      setSeccionForm({
        _id: "",
        nombre: "",
        descripcion: "",
        fechaInicio: "",
        fechaFinal: "",
        archivos: {
          nombre: "",
          direccion: ""
        }
      });
      // Llama a la función getSecciones para actualizar la lista de Secciones.
      getSeccionesByCurso(id);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Fragment>




      <h2>Agregar Seccion</h2>

      <div className="form-grid">
        <div className="input-group">
          <label>ID</label>
          <input
            type="text"
            placeholder="ID"
            value={SeccionForm._id}
            onChange={(e) => setSeccionForm({ ...SeccionForm, _id: e.target.value })}
          />
        </div>

        <div className="input-group">
          <label>Código</label>
          <input
            type="text"
            placeholder="Código"
            value={SeccionForm.codigo}
            onChange={(e) => setSeccionForm({ ...SeccionForm, codigo: e.target.value })}
          />
        </div>

        <div className="input-group">
          <label>Nombre</label>
          <input
            type="text"
            placeholder="Nombre"
            value={SeccionForm.nombre}
            onChange={(e) => setSeccionForm({ ...SeccionForm, nombre: e.target.value })}
          />
        </div>

        <div className="input-group">
          <label>Descripción</label>
          <textarea
            placeholder="Descripción"
            value={SeccionForm.descripcion}
            onChange={(e) => setSeccionForm({ ...SeccionForm, descripcion: e.target.value })}
          />
        </div>

        <div className="input-group">
          <label>Fecha de Inicio</label>
          <input
            type="date"
            placeholder="Fecha de Inicio"
            value={SeccionForm.fechaInicio}
            onChange={(e) => setSeccionForm({ ...SeccionForm, fechaInicio: e.target.value })}
          />
        </div>

        <div className="input-group">
          <label>Fecha de Fin (opcional)</label>
          <input
            type="date"
            placeholder="Fecha de Fin (opcional)"
            value={SeccionForm.fechaFinal}
            onChange={(e) => setSeccionForm({ ...SeccionForm, fechaFinal: e.target.value })}
          />
        </div>

        <div className="input-group">
          <label>Nombre del Archivo</label>
          <input
            type="text"
            placeholder="Nombre del Archivo"
            value={SeccionForm.archivos.nombre}
            onChange={(e) =>
              setSeccionForm({
                ...SeccionForm,
                archivos: { ...SeccionForm.archivos, nombre: e.target.value }
              })
            }
          />
        </div>

        <div className="input-group">
          <label>Dirección del Archivo</label>
          <input
            type="text"
            placeholder="Dirección del Archivo"
            value={SeccionForm.archivos.direccion}
            onChange={(e) =>
              setSeccionForm({
                ...SeccionForm,
                archivos: { ...SeccionForm.archivos, direccion: e.target.value }
              })
            }
          />
        </div>
      </div>
      <div className="button-links">
        <button onClick={editarSeccion}>Editar Seccion</button>
        <button onClick={agregarSeccion}>Agregar Nuevo</button>
      </div>
    </Fragment>

  );
};

export default SectionForm;