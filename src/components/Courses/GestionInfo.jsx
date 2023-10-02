// Importa las dependencias necesarias de React y otros módulos.
import React, { Fragment, useEffect, useState } from "react";
import connect from "../API/mongoConnection";
import './style.css'
import InfoForm from "./Forms/InfoForm"
import InfosTable from "./Tables/InfosTable";

const GestionInfos = ({ id }) => {
  // arreglo vacio para cargar Infos cuando se llama por primera vez
  // SetInfos alojamiento automatico en memoria (estado de react), cambios que se reflejan en pantalla
  const [Infos, setInfos] = useState([]);

  const [InfosForm, setInfosForm] = useState({
    _id: "",
    id_seccion: id,
    codigo: "",
    nombre: "",

  });

  // Se muestran las Infos en pantalla apenas carga la página
  useEffect(() => {
    getInfosbySeccion();

  }, []); // es vació porque sólo se ejecutara una vez


  // async se refiere a que puede contener operaciones asincronicas
  async function getInfosbySeccion() {

    try {
      // Intenta obtener datos de Infos utilizando el servicio Infoservice.
      const data = await connect.InfoService.obtenerInfoBySeccion(id);
      console.log(data);
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
      getInfosbySeccion();
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <Fragment>

      <InfosTable {...{ Infos, setInfosForm, eliminarInfos }} />
      <InfoForm {...{ id, InfosForm, getInfosbySeccion, setInfosForm }} />

    </Fragment>
  );
};

export default GestionInfos;
