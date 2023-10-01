// GestionCursos.js

import React, { Fragment } from "react";
import GestionEvaluaciones from "./Evaluations";
import GestionSecciones from "./Sections";
import { useParams } from 'react-router-dom';

const AdminCurso = () => {

  let { id } = useParams();

  return (
    <Fragment>
      <h1> Admin Curso  {id}</h1>
      <GestionEvaluaciones id={id} />
      <GestionSecciones id={id} />
    </Fragment>
  );
};

export default AdminCurso;