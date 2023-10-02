// GestionCursos.js

import React, { Fragment } from "react";
import GestionSubTemas from "../Gestion/GestionSubTemas";
import GestionInfo from "../Gestion/GestionInfo";
import { useParams } from 'react-router-dom';
const AdminTema = () => {
  let { id } = useParams();
  return (
    <Fragment>
      <div className="p-3 mb-2 bg-dark vh-100 text-white border-white">
        <a href={`/gestionCursos`} >
          <i className="fa fa-arrow-left"></i>
          Gestión de Cursos
        </a>
        <h1> Admin Tema  {id}</h1>
        <GestionSubTemas id={id} />
        <GestionInfo id={id} tipo="Tema" />
      </div>
    </Fragment>
  );
};
export default AdminTema;