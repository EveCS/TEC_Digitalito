// Importa las dependencias necesarias de React y otros módulos.
import React, { Fragment, useEffect, useState } from "react";
import connect from "../API/mongoConnection";
import './style.css'
import EvaluationForm from "./Forms/EvaluationForm"
import { useParams } from 'react-router-dom';

const GestionEvaluaciones = ({ id }) => {
  // arreglo vacio para cargar evaluaciones cuando se llama por primera vez
  // SetEvaluaciones alojamiento automatico en memoria (estado de react), cambios que se reflejan en pantalla
  const [Evaluaciones, setEvaluaciones] = useState([]);
  const [Evaluacion, setEvaluacion] = useState();
  let { idEval, idCurso } = useParams();
  const [EvaluacionForm, setEvaluacionForm] = useState({
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

  // Se muestran las evaluaciones en pantalla apenas carga la página
  useEffect(() => {
    if (id) {

      getEvaluacionesByCurso(id);

    } else {

      getEvaluacionesByID(idCurso, idEval);
    }

  }, [id]); // es vació porque sólo se ejecutara una vez

  // async se refiere a que puede contener operaciones asincronicas
  async function getEvaluaciones() {
    try {
      // Intenta obtener datos de evaluaciones utilizando el servicio Evaluacioneservice.
      const data = await connect.EvaluacionService.obtenerEvaluaciones();
      // Una vez que se obtienen los datos exitosamente, actualiza el estado Evaluaciones con esos datos. 
      setEvaluaciones(data);
      // En caso de que ocurra un error al obtener los datos, imprime el error en la consola.
    } catch (error) {
      console.error(error);
    }
  }

  // async se refiere a que puede contener operaciones asincronicas
  async function getEvaluacionesByCurso(id2) {

    try {
      // Intenta obtener datos de evaluaciones utilizando el servicio Evaluacioneservice.
      const data = await connect.EvaluacionService.obtenerEvaluacionesByCurso(id2);

      // Una vez que se obtienen los datos exitosamente, actualiza el estado Evaluaciones con esos datos. 
      setEvaluaciones(data);
      // En caso de que ocurra un error al obtener los datos, imprime el error en la consola.
    } catch (error) {
      console.error(error);
    }
  }

  // async se refiere a que puede contener operaciones asincronicas
  async function getEvaluacionesByID(idCurso, id2) {

    try {

      // Intenta obtener datos de evaluaciones utilizando el servicio Evaluacioneservice.
      const data = await connect.EvaluacionService.obtenerEvaluacionesByID(id2, idCurso);

      // Una vez que se obtienen los datos exitosamente, actualiza el estado Evaluaciones con esos datos. 
      setEvaluacion(data);
      // En caso de que ocurra un error al obtener los datos, imprime el error en la consola.
    } catch (error) {
      console.error(error);
    }
  }

  async function eliminarEvaluacion(id) {
    try {
      await connect.EvaluacionService.eliminarEvaluacion(id);
      getEvaluaciones();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Fragment>
      {Evaluacion ? (
        <h1>Lista de Evaluaciones  </h1>
      ) : (<h1>Evaluacion  {idEval}</h1>)}


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
          {Evaluaciones ? (
            Evaluaciones.map((Evaluacion) => (
              <tr key={Evaluacion._id}>
                <td>
                  <a href={`/adminEvaluacion/${Evaluacion._id}/Curso/${id}`} target="_blank" rel="noopener noreferrer">
                    <i className="fa fa-external-link"></i>
                    {Evaluacion._id}
                  </a>
                </td>
                <td>{Evaluacion.nombre}</td>
                <td>{Evaluacion.descripcion}</td>
                <td>{Evaluacion.fechaInicio}</td>
                <td>{Evaluacion.fechaFinal}</td>
                <td>
                  <button onClick={() => eliminarEvaluacion(Evaluacion._id)}>Eliminar</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No hay evaluaciones disponibles</td>
            </tr>
          )}


        </tbody>

      </table>
      <hr></hr>

      {Evaluacion &&
        <div>
          <h1>{Evaluacion.nombre}</h1>
          <p>Código: {Evaluacion.codigo}</p>
          <p>Descripción: {Evaluacion.descripcion}</p>
          <p>Fecha de Inicio: {Evaluacion.fechaInicio}</p>
          <p>Fecha Final: {Evaluacion.fechaFinal}</p>
          <p>Archivos:</p>
          <ul>
            <li>Nombre: {Evaluacion.archivos.nombre}</li>
            <li>Dirección: {Evaluacion.archivos.direccion}</li>
          </ul>
        </div>}

      {!Evaluacion &&
        <EvaluationForm
          id2={id}
          EvaluacionForm={EvaluacionForm}
          getEvaluacionesByCurso={getEvaluacionesByCurso}
          setEvaluacionForm={setEvaluacionForm}
        />
      }
    </Fragment>
  );
};

export default GestionEvaluaciones;
