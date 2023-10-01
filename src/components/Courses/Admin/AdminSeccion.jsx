// GestionCursos.js

import React, { Fragment, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

const AdminSeccion = () => {

  let { id } = useParams();


  // Fetch the list of cursos when the component mounts
  useEffect(() => {
    //getCursoEvals();
  }, []);


  return (
    <Fragment>

      <h1> Admin Seccion  {id}</h1>


    </Fragment>
  );
};

export default AdminSeccion;