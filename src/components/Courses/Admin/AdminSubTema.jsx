// GestionCursos.js

import React, { Fragment } from "react";
import { useParams } from 'react-router-dom';
import GestionInfo from "../Gestion/GestionInfo";
const AdminSubTema = () => {
  let { id } = useParams();
  return (
    <Fragment>
      <h1> Admin SubTema  {id}</h1>
      <GestionInfo id={id} tipo="SubTema" />
    </Fragment>
  );
};
export default AdminSubTema;