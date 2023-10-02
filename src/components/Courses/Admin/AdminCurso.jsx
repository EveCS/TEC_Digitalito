// Admin Curso
/*

*/
import React, { Fragment } from "react";
import GestionEvaluaciones from "../Gestion/GestionEvaluaciones";
import GestionSecciones from "../Gestion/GestionSecciones";
import { useParams } from 'react-router-dom';
const AdminCurso = () => {
  let { id } = useParams();
  return (
    <Fragment>
      <h1 className="text-center"> <a className="text-center" href={`/gestionCursos`} >
        <i className="fa fa-arrow-left"></i>
        Gestión de Cursos
      </a> ID Curso = [{id}]</h1>

      <GestionEvaluaciones id={id} />
      <hr></hr>
      <GestionSecciones id={id} />
    </Fragment>
  );
};
export default AdminCurso;