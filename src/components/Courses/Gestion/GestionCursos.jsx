// GestionCursos.js

import React, { Fragment, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import connect from "../../API/mongoConnection";
import '../style.css'
import CursosForm from "../Forms/CoursesForm";
import CoursesTable from "../Tables/CoursesTable";

const GestionCursos = () => {

  const location = useLocation();
  const username = location.state && location.state.usuario ? location.state.usuario : "DefaultUsername";
  const [cursos, setCursos] = useState([]);
  const [cursoForm, setCursoForm] = useState({
    codigo: "",
    nombre: "",
    descripcion: "",
    fechaInicio: "",
    fechaFin: "",
    foto: "",
    publicado: false,
    username: username
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
  async function duplicarCurso(curso) {
    try {

      await connect.CursoService.duplicarCurso(curso);
      getCursos();
    } catch (error) {
      console.error(error);
    }
  }


  return (
    <Fragment>
      <div className=" bg-dark">
        <div className="row container">
          <h1 className="text-center">
            <a className="w-25 btn btn-lg btn-secondary" href={`/adminMenu?username=${username}`} >
              <i className="fa fa-arrow-left"></i>
              Menu Admin
            </a> Admin  [{username}]</h1>
          <div className="col-md-1"></div>
          <div className="col-md-4">
            <CursosForm {...{ cursoForm, getCursos, setCursoForm }} />
          </div>
          <div className="col-md-5">
            <CoursesTable {...{ cursos, getCursos, setCursoForm, eliminarCurso, publicarCurso, duplicarCurso }} />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default GestionCursos;