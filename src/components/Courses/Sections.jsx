// Importa las dependencias necesarias de React y otros módulos.
import React, { Fragment, useEffect, useState } from "react";
import connect from "../API/mongoConnection";
import SectionForm from "./Forms/SectionForm"
import './style.css'
const GestionSecciones = (id) => {
  // arreglo vacio para cargar Secciones cuando se llama por primera vez
  // SetSecciones alojamiento automatico en memoria (estado de react), cambios que se reflejan en pantalla
  const [Secciones, setSecciones] = useState([]);

  const [SeccionForm, setSeccionForm] = useState({
    _id: "",
    codigo: "",
    nombre: "",
    descripcion: "",
    fechaInicio: "",
    fechaFinal: "",
    archivos: {
      nombre: "",
      direccion: ""
    }
  });

  // Se muestran las Secciones en pantalla apenas carga la página
  useEffect(() => {
    getSeccionesByCurso(id);
  }, []); // es vació porque sólo se ejecutara una vez

  // async se refiere a que puede contener operaciones asincronicas
  async function getSecciones() {
    try {
      // Intenta obtener datos de Secciones utilizando el servicio Seccioneservice.
      const data = await connect.SeccionService.obtenerSecciones();
      // Una vez que se obtienen los datos exitosamente, actualiza el estado Secciones con esos datos. 
      setSecciones(data);
      // En caso de que ocurra un error al obtener los datos, imprime el error en la consola.
    } catch (error) {
      console.error(error);
    }
  }

  // async se refiere a que puede contener operaciones asincronicas
  async function getSeccionesByCurso(id) {

    try {
      // Intenta obtener datos de Secciones utilizando el servicio Seccioneservice.
      const data = await connect.SeccionService.obtenerSeccionesByCurso(id.id);

      // Una vez que se obtienen los datos exitosamente, actualiza el estado Secciones con esos datos. 
      setSecciones(data);
      // En caso de que ocurra un error al obtener los datos, imprime el error en la consola.
    } catch (error) {
      console.error(error);
    }
  }



  async function eliminarSeccion(id) {
    try {
      await connect.SeccionService.eliminarSeccion(id);
      getSecciones();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Fragment>
      <h1>Lista de Secciones</h1>

      <table className="table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Fecha de Inicio</th>
            <th>Fecha Final</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {Secciones ? (
            Secciones.map((Seccion) => (
              <tr key={Seccion._id}>
                <td>
                  <a href={`/adminSeccion/${Seccion._id}`} target="_blank" rel="noopener noreferrer">
                    <i className="fa fa-external-link"></i>
                    {Seccion._id}
                  </a>
                </td>
                <td>{Seccion.nombre}</td>
                <td>{Seccion.descripcion}</td>
                <td>{Seccion.fechaInicio}</td>
                <td>{Seccion.fechaFinal}</td>
                <td>
                  <button onClick={() => eliminarSeccion(Seccion._id)}>Eliminar</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No hay secciones disponibles</td>
            </tr>
          )}
        </tbody>

      </table>
      <hr></hr>
      <SectionForm SeccionForm={SeccionForm} getSeccionesByCurso={getSeccionesByCurso} setSeccionForm={setSeccionForm} />
    </Fragment>
  );
};

export default GestionSecciones;
