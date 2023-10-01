// Importa las dependencias necesarias de React y otros módulos.
import React, { Fragment, useEffect, useState } from "react";
import connect from "../API/mongoConnection";
import './style.css'
import EvaluationForm from "./Forms/EvaluationForm"
import EvaluationsTable from "./Tables/EvaluationsTable";

const GestionEvaluaciones = ({ id }) => {
  // arreglo vacio para cargar evaluaciones cuando se llama por primera vez
  // SetEvaluaciones alojamiento automatico en memoria (estado de react), cambios que se reflejan en pantalla
  const [Evaluaciones, setEvaluaciones] = useState([]);

  const [EvaluacionForm, setEvaluacionForm] = useState({
    _id: "",
    id_curso: id,
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
      getEvaluacionesByCurso();
    }
  }, []); // es vació porque sólo se ejecutara una vez


  // async se refiere a que puede contener operaciones asincronicas
  async function getEvaluacionesByCurso() {

    try {
      // Intenta obtener datos de evaluaciones utilizando el servicio Evaluacioneservice.
      const data = await connect.EvaluacionService.obtenerEvaluacionesByCurso(id);

      // Una vez que se obtienen los datos exitosamente, actualiza el estado Evaluaciones con esos datos. 
      setEvaluaciones(data);
      // En caso de que ocurra un error al obtener los datos, imprime el error en la consola.
    } catch (error) {
      console.error(error);
    }
  }

  // Delete a evaluacion
  async function eliminarEvaluacion(id) {
    try {
      await connect.EvaluacionService.eliminarEvaluacion(id);
      getEvaluacionesByCurso();
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <Fragment>

      <EvaluationsTable Evaluaciones={Evaluaciones} setEvaluacionForm={setEvaluacionForm} eliminarEvaluacion={eliminarEvaluacion} />
      <EvaluationForm id2={id} EvaluacionForm={EvaluacionForm} getEvaluacionesByCurso={getEvaluacionesByCurso} setEvaluacionForm={setEvaluacionForm} />

    </Fragment>
  );
};

export default GestionEvaluaciones;
