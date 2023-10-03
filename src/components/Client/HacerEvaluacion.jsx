import React, { Fragment, useEffect, useState } from "react";
import connect from '../API/mongoConnection';
import { insertNota } from "../API/cassandraConnection"; 
import { getCursosbyUser } from "../API/cassandraConnection";
import { useNavigate, useLocation } from "react-router-dom";

const ExamenComponent = () => {
  const location = useLocation();
  const username = location.state.usuario;
  const [examenData, setExamenData] = useState([]);
  const [cursoid, setCursoid] = useState([]);
  const [examenID, setExamenID] = useState([]); // Estado local para examenID
  const [respuestas, setRespuestas] = useState([]);
  const [notaFinal, setNotaFinal] = useState(null);
  const [userData,setUserData] = useState([]);
 
   
    const fetchData = async () => {
        try {
            const response = await getCursosbyUser(username);
            setUserData(response);
           
        } catch (error) {
            console.error('Error al obtener matrícula:', error);
        }
    };


  

  const handleChangeRespuesta = (index, valor) => {
    const nuevasRespuestas = [...respuestas];
    nuevasRespuestas[index] = valor;
    setRespuestas(nuevasRespuestas);
  };

  const handleLoadExamen = async () => {
    fetchData();
    const cursosIds = userData.map(item => item.curso_id); // sacar el user data
    console.log(cursosIds);
    const response = await connect.EvaluacionService.obtenerCursoById(examenID); // sacar evaluacion data
    setCursoid(response.id_curso);

    try {
      console.log("Cargando examen...");
  
      if (cursosIds.includes(cursoid)) {
       
        setExamenData(response);
   
      } else {
        alert('Usted no pertenece al curso que tiene esa evaluacion.');
      }
    } catch (error) {
      console.error('Error al obtener el examen:', error);
    }
  };
  

  const handleSubmit = () => {
    const opcionesCorrectas = examenData.opcionesCorrectas;
    let nota = 0;

    respuestas.forEach((respuesta, index) => {
      if (respuesta === opcionesCorrectas[index]) {
        nota++;
      }
    });

    const notaFinal = (nota / opcionesCorrectas.length) * 100;
    setNotaFinal(notaFinal);

    insertNota(username,examenID,cursoid,notaFinal)
  };

  return (
    <div>
      <h1>{examenData.nombre}</h1>
      <input 
        type="text" 
        value={examenID} 
        onChange={(e) => setExamenID(e.target.value)}
      />
      <button onClick={handleLoadExamen}>Cargar Examen</button> {/* Nuevo botón para cargar el examen */}
      {examenData.preguntas && examenData.preguntas.map((pregunta, index) => (
        <div key={pregunta._id}>
          <p>{pregunta.pregunta[0]}</p>
          <select
            value={respuestas[index] || ''}
            onChange={(e) => handleChangeRespuesta(index, e.target.value)}
          >
            <option value="">Selecciona una opción</option>
            {pregunta.opciones.map((opcion) => (
              <option key={opcion} value={opcion}>
                Opción {opcion}
              </option>
            ))}
          </select>
        </div>
      ))}
      <button onClick={handleSubmit}>Enviar Examen</button>
      {notaFinal !== null && <p>Tu nota final es: {notaFinal}</p>}
    </div>
  );
};

export default ExamenComponent;
