// GestionCursos.js

import React, { Fragment, useEffect, useState } from "react";
import GestionEvaluaciones from "./Evaluations";
import GestionMatriculas from "./Registration";

const AdminCurso = () => {
  const [cursos, setCursos] = useState([]);
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
      <h1>Admin Curso</h1>
      <GestionEvaluaciones />
      <GestionMatriculas />
    </Fragment>
  );
};

export default AdminCurso;