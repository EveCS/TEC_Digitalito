// GestionCursos.js

import React, { Fragment } from "react";
import GestionEvaluaciones from "../Gestion/GestionEvaluaciones";
import GestionSecciones from "../Gestion/GestionSecciones";
import { useParams } from 'react-router-dom';
const AdminCurso = () => {
  let { id } = useParams();
  return (
    <Fragment>
      <h1> Admin Curso  {id}</h1>

      <GestionEvaluaciones id={id} />
      <hr></hr>
      <GestionSecciones id={id} />
    </Fragment>
  );
};
export default AdminCurso;