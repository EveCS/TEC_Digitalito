import React, { Fragment } from "react";
import connect from "../../API/mongoConnection";
import '../style.css'

const TemasForm = ({ id, TemasForm, getTemasbySeccion, setTemasForm }) => {

  async function agregarTema() {
    try {
      await connect.TemaService.agregarTema(TemasForm);

      setTemasForm({
        _id: "",
        id_seccion: id,
        codigo: "",
        nombre: "",
        descripcion: ""
      });

      getTemasbySeccion(id);
    } catch (error) {
      console.error(error);
    }
  }

  async function EditarTema() {
    try {
      await connect.TemaService.editarTema(TemasForm._id, TemasForm);

      setTemasForm({
        _id: "",
        id_seccion: id,
        codigo: "",
        nombre: "",
      });

      getTemasbySeccion(id);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Fragment>
      <h2>Agregar Tema</h2>
      <div className="form-grid">
        <div className="input-group">
          <label>ID</label>
          <input
            type="text"
            placeholder="ID"
            value={TemasForm._id}
            onChange={(e) => setTemasForm({ ...TemasForm, _id: e.target.value })}
          />
        </div>

        <div className="input-group">
          <label>Código</label>
          <input
            type="text"
            placeholder="Código"
            value={TemasForm.codigo}
            onChange={(e) => setTemasForm({ ...TemasForm, codigo: e.target.value })}
          />
        </div>

        <div className="input-group">
          <label>Nombre</label>
          <input
            type="text"
            placeholder="Nombre"
            value={TemasForm.nombre}
            onChange={(e) => setTemasForm({ ...TemasForm, nombre: e.target.value })}
          />
        </div>

        <div className="input-group">
          <label>Descripción</label>
          <textarea
            placeholder="Descripción"
            value={TemasForm.descripcion}
            onChange={(e) => setTemasForm({ ...TemasForm, descripcion: e.target.value })}
          />
        </div>
      </div>

      <div className="button-links">
        <button onClick={EditarTema}>Editar Tema</button>
        <button onClick={agregarTema}>Agregar Nuevo</button>
      </div>
    </Fragment>
  );
};

export default TemasForm;
