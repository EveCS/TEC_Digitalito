import React, { Fragment } from "react";
import connect from "../../API/mongoConnection";
import '../style.css'

const InfosForm = ({ id, InfosForm, getInfosbyRef, setInfosForm }) => {

  async function agregarInfo() {
    try {
      await connect.InfoService.agregarInfo(InfosForm);

      setInfosForm({

        id_ref: id,
        codigo: "",
        nombre: "",
        descripcion: "",
        file: "",
        filename: ""
      });

      getInfosbyRef(id);
    } catch (error) {
      console.error(error);
    }
  }

  async function EditarInfo() {
    try {
      await connect.InfoService.editarInfo(InfosForm._id, InfosForm);

      setInfosForm({

        id_ref: id,
        codigo: "",
        nombre: "",
        descripcion: "",
        file: "",
        filename: ""
      });

      getInfosbyRef(id);
    } catch (error) {
      console.error(error);
    }
  }


  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();


    reader.onload = () => {
      const base64String = reader.result.split(',')[1];
      setInfosForm({ ...InfosForm, file: base64String });
      setInfosForm({ ...InfosForm, filename: file.name });
    };

    reader.readAsDataURL(file);
  };



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

        <div className="input-group">
          <label>Archivo</label>
          <input type="file" onChange={handleFileUpload} />
        </div>

      </div>


      <div>
        <button className="btn btn-primary" onClick={EditarInfo}>Editar Info</button>
        <button className="btn btn-primary" onClick={agregarInfo}>Agregar Nuevo</button>
      </div>
    </Fragment>
  );
};

export default InfosForm;
