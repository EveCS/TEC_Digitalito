import React, { Fragment } from "react";
import connect from "../../API/mongoConnection";
import '../style.css'

const InfosForm = ({ id, InfosForm, getInfosbySeccion, setInfosForm }) => {

  async function agregarInfo() {
    try {
      await connect.InfoService.agregarInfo(InfosForm);

      setInfosForm({

        id_seccion: id,
        codigo: "",
        nombre: "",
        descripcion: ""
      });

      getInfosbySeccion(id);
    } catch (error) {
      console.error(error);
    }
  }

  async function EditarInfo() {
    try {
      await connect.InfoService.editarInfo(InfosForm._id, InfosForm);

      setInfosForm({

        id_seccion: id,
        codigo: "",
        nombre: "",
      });

      getInfosbySeccion(id);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Fragment>
      <h2>Agregar Info</h2>
      <div className="form-grid">


        <div className="input-group">
          <label>Código</label>
          <input
            type="text"
            placeholder="Código"
            value={InfosForm.codigo}
            onChange={(e) => setInfosForm({ ...InfosForm, codigo: e.target.value })}
          />
        </div>

        <div className="input-group">
          <label>Nombre</label>
          <input
            type="text"
            placeholder="Nombre"
            value={InfosForm.nombre}
            onChange={(e) => setInfosForm({ ...InfosForm, nombre: e.target.value })}
          />
        </div>

        <div className="input-group">
          <label>Descripción</label>
          <textarea
            placeholder="Descripción"
            value={InfosForm.descripcion}
            onChange={(e) => setInfosForm({ ...InfosForm, descripcion: e.target.value })}
          />
        </div>
      </div>

      <div className="button-links">
        <button onClick={EditarInfo}>Editar Info</button>
        <button onClick={agregarInfo}>Agregar Nuevo</button>
      </div>
    </Fragment>
  );
};

export default InfosForm;
