// Importa las dependencias necesarias de React y otros módulos.
import React, { Fragment, useEffect, useState } from "react";
import connect from "../../API/mongoConnection";
import '../style.css'
import TemaForm from "../Forms/TemaForm"
import TemasTable from "../Tables/TemasTable";

const GestionTemas = ({ id }) => {
  // arreglo vacio para cargar Temas cuando se llama por primera vez
  // SetTemas alojamiento automatico en memoria (estado de react), cambios que se reflejan en pantalla
  const [Temas, setTemas] = useState([]);

  const [TemasForm, setTemasForm] = useState({

    id_seccion: id,
    codigo: "",
    nombre: "",

  });

  // Se muestran las Temas en pantalla apenas carga la página
  useEffect(() => {
    getTemasbySeccion();

  }, []); // es vació porque sólo se ejecutara una vez


  // async se refiere a que puede contener operaciones asincronicas
  async function getTemasbySeccion() {

    try {
      // Intenta obtener datos de Temas utilizando el servicio Temaservice.
      const data = await connect.TemaService.obtenerTemaBySeccion(id);

      // Una vez que se obtienen los datos exitosamente, actualiza el estado Temas con esos datos. 
      setTemas(data);
      // En caso de que ocurra un error al obtener los datos, imprime el error en la consola.
    } catch (error) {
      console.error(error);
    }
  }

  // Delete a Temas
  async function eliminarTemas(id2) {
    try {
      await connect.TemaService.eliminarTema(id2);
      getTemasbySeccion();
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <Fragment>
      <div className="container bg-dark">

        <div className="row">
          <div className="col-md-4">
            <TemaForm {...{ id, TemasForm, getTemasbySeccion, setTemasForm }} />
          </div>
          <div className="col-md-6">
            <TemasTable {...{ Temas, setTemasForm, eliminarTemas }} />
          </div>
        </div>
      </div>
    </Fragment>


  );
};

export default GestionTemas;
