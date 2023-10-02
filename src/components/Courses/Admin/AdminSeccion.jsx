// GestionCursos.js

import React, { Fragment } from "react";
import { useParams } from 'react-router-dom';
import GestionTemas from "../GestionTemas";

const AdminSeccion = () => {
  let { id } = useParams();

  return (
    <Fragment>
      <h1> Admin Seccion  {id}</h1>
      <GestionTemas id={id} />
    </Fragment>
  );
};

export default AdminSeccion;