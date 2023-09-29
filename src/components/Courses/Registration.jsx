// GestionMatriculas.js

import React, { Fragment, useEffect, useState } from "react";
import MatriculaService from "../API/mongoConnection"; // Asegúrate de importar tu propio servicio

const GestionMatriculas = () => {
  const [Matriculas, setMatriculas] = useState([]);
  const [MatriculaForm, setMatriculaForm] = useState({
    _id: "",
    username: "",
    course_id: "",
    date: "",
    result: ""
  });

  useEffect(() => {
    getMatriculas();
  }, []);

  async function getMatriculas() {
    try {
      const data = await MatriculaService.obtenerMatriculas();
      setMatriculas(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function agregarMatricula() {
    try {
      await MatriculaService.agregarMatricula(MatriculaForm);
      setMatriculaForm({
        _id: "",
        username: "",
        course_id: "",
        date: "",
        result: ""
      });
      getMatriculas();
    } catch (error) {
      console.error(error);
    }
  }

  async function editarMatricula() {
    try {
      await MatriculaService.editarMatricula(MatriculaForm._id, MatriculaForm);
      setMatriculaForm({
        _id: "",
        username: "",
        course_id: "",
        date: "",
        result: ""
      });
      getMatriculas();
    } catch (error) {
      console.error(error);
    }
  }

  async function eliminarMatricula(id) {
    try {
      await MatriculaService.eliminarMatricula(id);
      getMatriculas();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Fragment>
      <h1>Lista de Matriculas</h1>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Course ID</th>
            <th>Date</th>
            <th>Result</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {Matriculas.map((Matricula) => (
            <tr key={Matricula._id}>
              <td>{Matricula._id}</td>
              <td>{Matricula.username}</td>
              <td>{Matricula.course_id}</td>
              <td>{Matricula.date}</td>
              <td>{Matricula.result}</td>
              <td>
                <button onClick={() => setMatriculaForm(Matricula)}>Editar</button>
                <button onClick={() => eliminarMatricula(Matricula._id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Agregar/Editar Matricula</h2>
      <input
        type="text"
        placeholder="ID"
        value={MatriculaForm._id}
        onChange={(e) => setMatriculaForm({ ...MatriculaForm, _id: e.target.value })}
      />
      <input
        type="text"
        placeholder="Username"
        value={MatriculaForm.username}
        onChange={(e) => setMatriculaForm({ ...MatriculaForm, username: e.target.value })}
      />
      <input
        type="text"
        placeholder="Course ID"
        value={MatriculaForm.course_id}
        onChange={(e) => setMatriculaForm({ ...MatriculaForm, course_id: e.target.value })}
      />
      <input
        type="text"
        placeholder="Date"
        value={MatriculaForm.date}
        onChange={(e) => setMatriculaForm({ ...MatriculaForm, date: e.target.value })}
      />
      <input
        type="text"
        placeholder="Result"
        value={MatriculaForm.result}
        onChange={(e) => setMatriculaForm({ ...MatriculaForm, result: e.target.value })}
      />

      <button onClick={editarMatricula}>Editar Matricula</button>
      <button onClick={agregarMatricula}>Agregar Nuevo</button>
    </Fragment>
  );
};

export default GestionMatriculas;
