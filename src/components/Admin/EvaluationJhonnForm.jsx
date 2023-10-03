import React, { useState } from 'react';
import connect from '../API/mongoConnection';


const EvaluationForm = ({ id2 }) => {
  const [evaluation, setEvaluation] = useState({
    _id: '',
    id_curso: id2,
    nombre: '',
    fechaInicio: '',
    fechaFinal: '',
    preguntas: [],
    opcionesCorrectas: []
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEvaluation({ ...evaluation, [name]: value });
  };

  const handleQuestionAdd = () => {
    setEvaluation({
      ...evaluation,
      preguntas: [...evaluation.preguntas, { pregunta: '', opciones: [] }],
    });
  };

  const handleQuestionChange = (questionIndex, e) => {
    const { name, value } = e.target;
    const updatedQuestions = [...evaluation.preguntas];
    updatedQuestions[questionIndex] = { ...updatedQuestions[questionIndex], [name]: value };
    setEvaluation({ ...evaluation, preguntas: updatedQuestions });
  };

  const handleOptionChange = (questionIndex, optionIndex, e) => {
    const { value } = e.target;
    const updatedQuestions = [...evaluation.preguntas];
    updatedQuestions[questionIndex].opciones[optionIndex] = value;
    setEvaluation({ ...evaluation, preguntas: updatedQuestions });
  };

  const handleCorrectOptionsChange = (e) => {
    const { value } = e.target;
    setEvaluation({ ...evaluation, opcionesCorrectas: value.split(',') });
  };

  const handleQuestionOptionAdd = (questionIndex) => {
    const updatedQuestions = [...evaluation.preguntas];
    updatedQuestions[questionIndex].opciones.push('');
    setEvaluation({ ...evaluation, preguntas: updatedQuestions });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    //evaluation.id_curso = "curso1"; // ESTO <------------------------------------ Toca hacer que un boton de cursos lleve a esta pagina, esta pagina ocupa saber el cursoID para guardar la evaluacion y saber que pertenece a ese curso
    evaluation._id = evaluation.nombre; // ACA dejo el _id unico igual al nombre de la evaluacion, asi no hay 2 iguales.
    // Enviar el estado actual a tu servidor
    console.log(evaluation)
    try {

      const nuevaEvaluacion = await connect.EvaluacionService.agregarEvaluacion(evaluation);


      console.log('Evaluación agregada:', nuevaEvaluacion);
    } catch (error) {
      console.error('Error al agregar la evaluación:', error);
    }
  };


  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="nombre">Nombre 2:</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={evaluation.nombre}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label htmlFor="fechaInicio">Fecha de Inicio:</label>
        <input
          type="date"
          id="fechaInicio"
          name="fechaInicio"
          value={evaluation.fechaInicio}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label htmlFor="fechaFinal">Fecha Final:</label>
        <input
          type="date"
          id="fechaFinal"
          name="fechaFinal"
          value={evaluation.fechaFinal}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label htmlFor="opcionesCorrectas">Opciones Correctas (Separadas por comas):</label>
        <input
          type="text"
          id="opcionesCorrectas"
          name="opcionesCorrectas"
          value={evaluation.opcionesCorrectas.join(',')}
          onChange={handleCorrectOptionsChange}
        />
      </div>

      <div>
        <button type="button" onClick={handleQuestionAdd}>
          Agregar Pregunta
        </button>
      </div>

      {evaluation.preguntas.map((question, questionIndex) => (
        <div key={questionIndex}>
          <label htmlFor={`pregunta${questionIndex}`}>Pregunta:</label>
          <input
            type="text"
            id={`pregunta${questionIndex}`}
            name="pregunta"
            value={question.pregunta}
            onChange={(e) => handleQuestionChange(questionIndex, e)}
          />
          <div>
            Opciones:
            {question.opciones.map((opcion, optionIndex) => (
              <div key={optionIndex}>
                <input
                  type="text"
                  value={opcion}
                  onChange={(e) => handleOptionChange(questionIndex, optionIndex, e)}
                />
              </div>
            ))}
            <button type="button" onClick={() => handleQuestionOptionAdd(questionIndex)}>
              Agregar Opción
            </button>
          </div>
        </div>
      ))}

      <button type="submit">Crear Evaluación</button>
    </form>
  );
};

export default EvaluationForm;
