// GestionCursos.js

import React, { Fragment } from "react";
import GestionSubTemas from "../Gestion/GestionSubTemas";
import GestionInfo from "../Gestion/GestionInfo";
import { useParams } from 'react-router-dom';
const AdminTema = () => {
  let { id } = useParams();
  return (
    <Fragment>
      <div className="p-3 mb-2  bg-dark ">
        <a href={`/gestionCursos`} >
          <i className="fa fa-arrow-left"></i>

        </a>

        <GestionSubTemas id={id} />
        <hr></hr>
        <GestionInfo id={id} tipo="Tema" />
      </div>
    </Fragment>
  );
};
export default AdminTema;