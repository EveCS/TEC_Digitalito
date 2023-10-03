import React, { Fragment } from "react";
import connect from "../../API/mongoConnection";
import '../style.css'

const TemasForm = ({ id, SubTemasForm, getSubTemasbyTema, setSubTemasForm }) => {

  async function agregarSubTema() {
    try {
      await connect.SubTemaService.agregarSubTema(SubTemasForm);

      setSubTemasForm({

        id_tema: id,
        codigo: "",
        nombre: "",
        descripcion: ""
      });

      getSubTemasbyTema(id);
    } catch (error) {
      console.error(error);
    }
  }

  async function EditarSubTema() {
    try {
      await connect.SubTemaService.editarSubTema(SubTemasForm._id, SubTemasForm);

      setSubTemasForm({

        id_tema: id,
        codigo: "",
        nombre: "",
        descripcion: ""
      });

      getSubTemasbyTema(id);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Fragment>
      <h2>Agregar SubTema</h2>
      <div className="form-grid">


        <div className="input-group">
          <label>Código</label>
          <input
            type="text"
            placeholder="Código"
            value={SubTemasForm.codigo}
            onChange={(e) => setSubTemasForm({ ...SubTemasForm, codigo: e.target.value })}
          />
        </div>

        <div className="input-group">
          <label>Nombre</label>
          <input
            type="text"
            placeholder="Nombre"
            value={SubTemasForm.nombre}
            onChange={(e) => setSubTemasForm({ ...SubTemasForm, nombre: e.target.value })}
          />
        </div>

        <div className="input-group">
          <label>Descripción</label>
          <textarea
            placeholder="Descripción"
            value={SubTemasForm.descripcion}
            onChange={(e) => setSubTemasForm({ ...SubTemasForm, descripcion: e.target.value })}
          />
        </div>
      </div>

      <div className="btn btn-primary">
        <button className="btn btn-primary" onClick={EditarSubTema}>Editar Tema</button>
        <button className="btn btn-primary" onClick={agregarSubTema}>Agregar Nuevo</button>
      </div>
    </Fragment>
  );
};

export default TemasForm;
