// GestionCursos.js

import React, { Fragment, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

const AdminEvaluacion = () => {

  let { id } = useParams();
  return (
    <Fragment>
      <h1 className="text-center"> <a className="text-center" href={`/adminCurso`} >
        <i className="fa fa-arrow-left"></i>
        Gestión de Cursos
      </a> Evaluaciones = [{id}]</h1>

    </Fragment>
  );
};
export default AdminEvaluacion;