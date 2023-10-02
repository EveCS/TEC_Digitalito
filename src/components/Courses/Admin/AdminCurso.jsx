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
      <div className="p-3 mb-2 bg-dark vh-100 text-white border-white">
        <h1 className="text-center"> <a className="w-25 btn btn-lg btn-secondary" href={`/gestionCursos`} >
          <i className="fa fa-arrow-left"></i>
          Gestión de Cursos
        </a> ID Curso = [{id}]</h1>

        <GestionEvaluaciones id={id} />
        <hr></hr>
        <GestionSecciones id={id} />
      </div >
    </Fragment>

  );
};
export default AdminCurso;