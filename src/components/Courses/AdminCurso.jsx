// GestionCursos.js

import React, { Fragment, useEffect, useState } from "react";
import GestionEvaluaciones from "./Evaluations";
import GestionMatriculas from "./Registration";
import { useParams } from 'react-router-dom';

const AdminCurso = () => {
  const [cursos, setCursos] = useState([]);
  let { id } = useParams();
  const [cursoForm, setCursoForm] = useState({
    _id: "",
    nombre: "",
    creditos: "",
  });

  // Fetch the list of cursos when the component mounts
  useEffect(() => {
    //getCurso();
  }, []);


  return (
    <Fragment>
      <a href={`/gestionCursos`}>/Gestion de Cursos</a>
      <h1> Admin Curso  {id}</h1>
      <GestionEvaluaciones />
      <GestionMatriculas />
    </Fragment>
  );
};

export default AdminCurso;