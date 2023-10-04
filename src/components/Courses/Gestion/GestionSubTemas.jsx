// Importa las dependencias necesarias de React y otros módulos.
import React, { Fragment, useEffect, useState } from "react";
import connect from "../../API/mongoConnection";
import '../style.css'
import SubTemaForm from "../Forms/SubTemaForm"
import SubTemaTable from "../Tables/SubTemaTable";

const GestionSubTemas = ({ id }) => {
  // arreglo vacio para cargar SubTemas cuando se llama por primera vez
  // SetSubTemas alojamiento automatico en memoria (estado de react), cambios que se reflejan en pantalla
  const [SubTemas, setSubTemas] = useState([]);

  const [SubTemasForm, setSubTemasForm] = useState({

    id_tema: id,
    codigo: "",
    nombre: "",
    descripcion: "a"

  });

  // Se muestran las SubTemas en pantalla apenas carga la página
  useEffect(() => {

    getSubTemasbyTema();

  }, []); // es vació porque sólo se ejecutara una vez


  // async se refiere a que puede contener operaciones asincronicas
  async function getSubTemasbyTema() {

    try {
      // Intenta obtener datos de SubTemas utilizando el servicio SubTemaservice.
      const data = await connect.SubTemaService.obtenerSubTemaByTema(id);

      // Una vez que se obtienen los datos exitosamente, actualiza el estado SubTemas con esos datos. 
      setSubTemas(data);
      // En caso de que ocurra un error al obtener los datos, imprime el error en la consola.
    } catch (error) {
      console.error(error);
    }
  }

  // Delete a SubTemas
  async function eliminarSubTemas(id2) {
    try {
      await connect.SubTemaService.eliminarSubTema(id2);
      getSubTemasbyTema();
    } catch (error) {
      console.error(error);
    }
  }
  return (

    <Fragment>
      <div className="bg-dark container">
        <div className="row">

          <div className="col-md-3">
            <SubTemaForm {...{ id, SubTemasForm, getSubTemasbyTema, setSubTemasForm }} />
          </div>
          <div className="col-md-6">
            <SubTemaTable {...{ SubTemas, setSubTemasForm, eliminarSubTemas }} />
          </div>
        </div>
      </div>
    </Fragment>


  );
};

export default GestionSubTemas;
