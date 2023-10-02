// GestionCursos.js

import React, { Fragment } from "react";
import { useParams } from 'react-router-dom';

const AdminSeccion = () => {
  let { id } = useParams();
  return (
    <Fragment>
      <h1> Admin Seccion  {id}</h1>
    </Fragment>
  );
};

export default AdminSeccion;