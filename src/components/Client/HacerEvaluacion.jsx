import React, { Fragment, useEffect, useState } from "react";
import connect from '../API/mongoConnection';
import { insertNota } from "../API/cassandraConnection"; 


const ExamenComponent = () => {
  const [examenData, setExamenData] = useState([]);
  const cursoid= "curso123"; // id del curso al que pertenece la evaluacion
  const examenID= "Evaluacion2"; // aca cambio a que sea el id de la evaluacion que voy a hacer.
  const username="JuanPerez"; // aca cambio al usuario que entro para guardarle la nota.
  const [respuestas, setRespuestas] = useState([]);
  const [notaFinal, setNotaFinal] = useState(null);


  useEffect(() => {
    const fetchMatricula = async () => {
        try {
            console.log("llegue");
            const response = await connect.EvaluacionService.obtenerCursoById(examenID);
            setExamenData(response);
            console.log(examenData);
        } catch (error) {
            console.error('Error al obtener el examen:', error);
        }
    };

    fetchMatricula();
}, [examenID]);

  const handleChangeRespuesta = (index, valor) => {
    const nuevasRespuestas = [...respuestas];
    nuevasRespuestas[index] = valor;
    setRespuestas(nuevasRespuestas);
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
