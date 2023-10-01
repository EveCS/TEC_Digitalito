// Importa las dependencias necesarias de React y otros módulos.
import React, { Fragment, useEffect, useState } from "react";
import connect from "../API/mongoConnection";
import './style.css'
import SectionForm from "./Forms/SectionForm"
import SectionsTable from "./Tables/SectionsTable";

const GestionSecciones = ({ id }) => {
  // arreglo vacio para cargar Secciones cuando se llama por primera vez
  // SetSecciones alojamiento automatico en memoria (estado de react), cambios que se reflejan en pantalla
  const [Secciones, setSecciones] = useState([]);

  const [SeccionForm, setSeccionForm] = useState({
    _id: "",
    id_curso: id,
    codigo: "",
    nombre: "",
    descripcion: "",
    archivos: {
      nombre: "",
      direccion: ""
    }
  });

  // Se muestran las Secciones en pantalla apenas carga la página
  useEffect(() => {
    if (id) {
      getSeccionesByCurso();
    }
  }, []); // es vació porque sólo se ejecutara una vez


  // async se refiere a que puede contener operaciones asincronicas
  async function getSeccionesByCurso() {

    try {
      // Intenta obtener datos de Secciones utilizando el servicio Seccioneservice.
      const data = await connect.SeccionService.obtenerSeccionesByCurso(id);

      // Una vez que se obtienen los datos exitosamente, actualiza el estado Secciones con esos datos. 
      setSecciones(data);
      // En caso de que ocurra un error al obtener los datos, imprime el error en la consola.
    } catch (error) {
      console.error(error);
    }
  }

  // Delete a Seccion
  async function eliminarSeccion(id) {
    try {
      await connect.SeccionService.eliminarSeccion(id);
      getSeccionesByCurso();
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <Fragment>

      <SectionsTable {...{ Secciones, setSeccionForm, eliminarSeccion }} />
      <SectionForm {...{ id2: id, SeccionForm, getSeccionesByCurso, setSeccionForm }} />

    </Fragment>
  );
};

export default GestionSecciones;
