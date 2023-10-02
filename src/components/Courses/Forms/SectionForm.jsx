// GestionCursos.js

import React, { Fragment, useEffect, useState } from "react";
import connect from "../../API/mongoConnection";
import '../style.css'

const SectionForm = ({ id2, SeccionForm, getSeccionesByCurso, setSeccionForm }) => {


  // Add or edit a curso
  async function agregarSeccion() {
    try {

      // Add the curso
      await connect.SeccionService.agregarSeccion(SeccionForm);


      // Clear the curso form
      setSeccionForm({
        _id: "",
        id_curso: id2,
        codigo: "",
        nombre: "",
        descripcion: ""

      });

      // Fetch the updated list of cursos
      getSeccionesByCurso(id2);
    } catch (error) {
      console.error(error);
    }
  }

  // Add or edit a curso
  async function EditarSeccion() {
    try {

      // Edit the curso
      let editC = await connect.SeccionService.editarSecciones(SeccionForm._id, SeccionForm);

      // Clear the curso form
      setSeccionForm({
        _id: "",
        codigo: "",
        nombre: "",
        descripcion: "",

      });

      // Fetch the updated list of cursos
      getSeccionesByCurso(id2);
    } catch (error) {
      alert(error);
    }
  }

  return (
    <Fragment>

      <h2>Agregar Sección</h2>


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


      </div>
      <div className="button-links">
        <button onClick={EditarSeccion}>Editar Seccion</button>
        <button onClick={agregarSeccion}>Agregar Nuevo</button>
      </div>
    </Fragment>

  );
};

export default SectionForm;