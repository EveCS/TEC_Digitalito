// Importa las dependencias necesarias de React y otros módulos.
import React, { Fragment, useEffect, useState } from "react";
import Evaluacioneservice from "../API/mongoConnection";

const GestionEvaluaciones = () => {
  // arreglo vacio para cargar evaluaciones cuando se llama por primera vez
  // SetEvaluaciones alojamiento automatico en memoria (estado de react), cambios que se reflejan en pantalla
  const [Evaluaciones, setEvaluaciones] = useState([]);

  const [EvaluacionForm, setEvaluacionForm] = useState({
    _id: "",
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
    getEvaluaciones();
  }, []); // es vació porque sólo se ejecutara una vez

  // async se refiere a que puede contener operaciones asincronicas
  async function getEvaluaciones() {
    try {
      // Intenta obtener datos de evaluaciones utilizando el servicio Evaluacioneservice.
      const data = await Evaluacioneservice.obtenerEvaluaciones();
       // Una vez que se obtienen los datos exitosamente, actualiza el estado Evaluaciones con esos datos. 
      setEvaluaciones(data);
      // En caso de que ocurra un error al obtener los datos, imprime el error en la consola.
    } catch (error) {
      console.error(error);
    }
  }

  async function agregarEvaluacion() {
    try {
      // Intenta agregar una nueva evaluación utilizando el servicio Evaluacioneservice y los datos de EvaluacionForm.
      await Evaluacioneservice.agregarEvaluacion(EvaluacionForm);
      // limpia las evaluaciones luego de agregarlas
      setEvaluacionForm({
        _id: "",
        nombre: "",
        descripcion: "",
        fechaInicio: "",
        fechaFinal: "",
        archivos: {
          nombre: "",
          direccion: ""
        }
      });
      // Llama a la función getEvaluaciones para actualizar la lista de evaluaciones.
      getEvaluaciones();
    } catch (error) {
      console.error(error);
    }
  }

  async function editarEvaluacion() {
    try {
      await Evaluacioneservice.editarEvaluacion(EvaluacionForm._id, EvaluacionForm);
      setEvaluacionForm({
        _id: "",
        nombre: "",
        descripcion: "",
        fechaInicio: "",
        fechaFinal: "",
        archivos: {
          nombre: "",
          direccion: ""
        }
      });
       // Llama a la función getEvaluaciones para actualizar la lista de evaluaciones.
      getEvaluaciones();
    } catch (error) {
      console.error(error);
    }
  }

  async function eliminarEvaluacion(id) {
    try {
      await Evaluacioneservice.eliminarEvaluacion(id);
      getEvaluaciones();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Fragment>
      <h1>Lista de Evaluaciones</h1>

      <table>
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
          {Evaluaciones.map((Evaluacion) => (
            <tr key={Evaluacion._id}>
              <td>{Evaluacion._id}</td>
              <td>{Evaluacion.nombre}</td>
              <td>{Evaluacion.descripcion}</td>
              <td>{Evaluacion.fechaInicio}</td>
              <td>{Evaluacion.fechaFinal}</td>
              <td>
                <button onClick={() => setEvaluacionForm(Evaluacion)}>Editar</button>
                <button onClick={() => eliminarEvaluacion(Evaluacion._id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Agregar/Editar Evaluacion</h2>
      <input
        type="text"
        placeholder="ID"
        value={EvaluacionForm._id}
        onChange={(e) => setEvaluacionForm({ ...EvaluacionForm, _id: e.target.value })}
      />
      <input
        type="text"
        placeholder="Nombre"
        value={EvaluacionForm.nombre}
        onChange={(e) => setEvaluacionForm({ ...EvaluacionForm, nombre: e.target.value })}
      />
      <input
        type="text"
        placeholder="Descripción"
        value={EvaluacionForm.descripcion}
        onChange={(e) => setEvaluacionForm({ ...EvaluacionForm, descripcion: e.target.value })}
      />
      <input
        type="text"
        placeholder="Fecha de Inicio"
        value={EvaluacionForm.fechaInicio}
        onChange={(e) => setEvaluacionForm({ ...EvaluacionForm, fechaInicio: e.target.value })}
      />
      <input
        type="text"
        placeholder="Fecha Final"
        value={EvaluacionForm.fechaFinal}
        onChange={(e) => setEvaluacionForm({ ...EvaluacionForm, fechaFinal: e.target.value })}
      />
      <input
        type="text"
        placeholder="Nombre del Archivo"
        value={EvaluacionForm.archivos.nombre}
        onChange={(e) =>
          setEvaluacionForm({
            ...EvaluacionForm,
            archivos: { ...EvaluacionForm.archivos, nombre: e.target.value }
          })
        }
      />
      <input
        type="text"
        placeholder="Dirección del Archivo"
        value={EvaluacionForm.archivos.direccion}
        onChange={(e) =>
          setEvaluacionForm({
            ...EvaluacionForm,
            archivos: { ...EvaluacionForm.archivos, direccion: e.target.value }
          })
        }
      />

      <button onClick={editarEvaluacion}>Editar Evaluacion</button>
      <button onClick={agregarEvaluacion}>Agregar Nuevo</button>
    </Fragment>
  );
};

export default GestionEvaluaciones;
