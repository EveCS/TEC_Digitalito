// GestionCursos.js

import React, { Fragment } from "react";
import { useParams } from 'react-router-dom';
import GestionTemas from "../Gestion/GestionTemas";
import GestionInfo from "../Gestion/GestionInfo";

const AdminSeccion = () => {
  let { id } = useParams();

  return (
    <Fragment>
      <h1> Admin Seccion  {id}</h1>
      <GestionTemas id={id} />
      <GestionInfo id={id} tipo="Seccion" />
    </Fragment>
  );
};

export default AdminSeccion;