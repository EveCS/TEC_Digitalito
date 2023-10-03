// Importa las dependencias necesarias de React y otros módulos.
import React, { Fragment, useEffect, useState } from "react";
import connect from "../../API/mongoConnection";
import '../style.css'
import InfoForm from "../Forms/InfoForm"
import InfosTable from "../Tables/InfoTable";

const GestionInfos = ({ id }) => {
  // arreglo vacio para cargar Infos cuando se llama por primera vez
  // SetInfos alojamiento automatico en memoria (estado de react), cambios que se reflejan en pantalla
  const [Infos, setInfos] = useState([]);

  const [InfosForm, setInfosForm] = useState({

    id_ref: id,
    codigo: "",
    nombre: "",
    descripcion: "",
    file: "",
    filename: ""

  });

  // Se muestran las Infos en pantalla apenas carga la página
  useEffect(() => {
    getInfosbyRef();

  }, []); // es vació porque sólo se ejecutara una vez


  // async se refiere a que puede contener operaciones asincronicas
  async function getInfosbyRef() {

    try {
      // Intenta obtener datos de Infos utilizando el servicio Infoservice.
      const data = await connect.InfoService.obtenerInfoByRef(id);

      // Una vez que se obtienen los datos exitosamente, actualiza el estado Infos con esos datos. 
      setInfos(data);
      // En caso de que ocurra un error al obtener los datos, imprime el error en la consola.
    } catch (error) {
      console.error(error);
    }
  }

  // Delete a Infos
  async function eliminarInfos(id2) {
    try {
      await connect.InfoService.eliminarInfo(id2);
      getInfosbyRef();
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <Fragment>
      <div className="mb-2  bg-dark vh-100 text-white border-white">
        <InfosTable {...{ Infos, setInfosForm, eliminarInfos }} />
        <InfoForm {...{ id, InfosForm, getInfosbyRef, setInfosForm }} />
      </div>
    </Fragment>
  );
};

export default GestionInfos;
