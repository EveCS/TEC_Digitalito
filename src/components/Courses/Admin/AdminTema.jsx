// GestionCursos.js

import React, { Fragment } from "react";
import GestionSubTemas from "../Gestion/GestionSubTemas";
import { useParams } from 'react-router-dom';
const AdminTema = () => {
  let { id } = useParams();
  return (
    <Fragment>
      <h1> Admin Tema  {id}</h1>
      <GestionSubTemas id={id} />
    </Fragment>
  );
};
export default AdminTema;