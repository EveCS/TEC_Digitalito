// GestionCursos.js

import React, { Fragment } from "react";
import { useParams } from 'react-router-dom';
import GestionTemas from "../Gestion/GestionTemas";
import GestionInfo from "../Gestion/GestionInfo";

const AdminSeccion = () => {
  let { id } = useParams();

  return (
    <Fragment>
      <div className="p-3 mb-2  bg-dark ">
        <a href={`/gestionCursos`} >
          <i className="fa fa-arrow-left"></i>
          Gestión de Cursos
        </a>
        <h1> Admin Seccion  {id}</h1>
        <GestionTemas id={id} />
        <GestionInfo id={id} tipo="Seccion" />
      </div>
    </Fragment>
  );
};

export default AdminSeccion;