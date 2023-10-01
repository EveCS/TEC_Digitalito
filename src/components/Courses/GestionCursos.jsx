// GestionCursos.js

import React, { Fragment, useEffect, useState } from "react";
import connect from "../API/mongoConnection";
import './style.css'
import CursosForm from "./Forms/CoursesForm";
import CoursesTable from "./Tables/CoursesTable";

const GestionCursos = () => {
  const [cursos, setCursos] = useState([]);
  const [cursoForm, setCursoForm] = useState({
    _id: "",
    codigo: "",
    nombre: "",
    descripcion: "",
    fechaInicio: "",
    fechaFin: "",
    foto: "",
  });

  // Fetch the list of cursos when the component mounts
  useEffect(() => {
    getCursos();
  }, []);

  // Fetch the list of cursos
  async function getCursos() {
    try {
      const data = await connect.CursoService.obtenerCursos();
      setCursos(data);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <Fragment>
      <CoursesTable {...{ cursos, getCursos, setCursoForm, connect }} />
      <CursosForm {...{ cursoForm, getCursos, setCursoForm, connect }} />
    </Fragment>
  );
};

export default GestionCursos;