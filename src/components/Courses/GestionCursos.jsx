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
    publicado: false
  });

  // Fetch the list of cursos when the component mounts
  useEffect(() => {
    getCursos();
  }, []);


  async function getCursos() {
    try {
      const data = await connect.CursoService.obtenerCursos();
      setCursos(data);
    } catch (error) {
      console.error(error);
    }
  }
  async function eliminarCurso(id) {
    try {
      await connect.CursoService.eliminarCurso(id);
      getCursos();
    } catch (error) {
      console.error(error);
    }
  }
  async function publicarCurso(_id, publicado) {
    try {
      if (publicado) {
        await connect.CursoService.despublicarCurso(_id);
      } else {
        await connect.CursoService.publicarCurso(_id);
      }

      getCursos();
    } catch (error) {
      console.error(error);
    }
  }


  return (
    <Fragment>
      <CoursesTable {...{ cursos, getCursos, setCursoForm, eliminarCurso, publicarCurso }} />
      <CursosForm {...{ cursoForm, getCursos, setCursoForm }} />
    </Fragment>
  );
};

export default GestionCursos;