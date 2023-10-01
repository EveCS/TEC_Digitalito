// GestionCursos.js

import React, { Fragment, useEffect, useState } from "react";
import GestionEvaluaciones from "./Evaluations";
import GestionSecciones from "./Sections";
import { useParams } from 'react-router-dom';

const AdminCurso = () => {

  let { id } = useParams();


  // Fetch the list of cursos when the component mounts
  useEffect(() => {
    //getCursoEvals();
  }, []);


  return (
    <Fragment>

      <h1> Admin Curso  {id}</h1>
      <GestionEvaluaciones id={id} />
      <GestionSecciones id={id} />
    </Fragment>
  );
};

export default AdminCurso;