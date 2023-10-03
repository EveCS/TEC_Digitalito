// GestionCursos.js

import React, { Fragment } from "react";
import { useParams } from 'react-router-dom';
import GestionTemas from "../Gestion/GestionTemas";
import GestionInfo from "../Gestion/GestionInfo";

const AdminSeccion = () => {
  let { id, idCurso } = useParams();

  return (
    <Fragment>

      <div className="p-3 mb-2  bg-dark ">

        <h1>  <a className="btn btn-success" href={`/adminCurso/${idCurso}`} >
          <i className="fa fa-arrow-left"></i>
          Gestión de Curso
        </a> | Admin Seccion {id} </h1>

        <hr></hr>
        <GestionTemas id={id} />
        <hr></hr>
        <GestionInfo id={id} tipo="Seccion" />
      </div>
    </Fragment>
  );
};

export default AdminSeccion;