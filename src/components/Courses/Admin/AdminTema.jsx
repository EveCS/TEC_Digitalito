// GestionCursos.js

import React, { Fragment } from "react";
import GestionEvaluaciones from "../GestionEvaluaciones";
import GestionSecciones from "../GestionSecciones";
import { useParams } from 'react-router-dom';
const AdminTema = () => {
  let { id } = useParams();
  return (
    <Fragment>
      <h1> Admin Tema  {id}</h1>

    </Fragment>
  );
};
export default AdminTema;