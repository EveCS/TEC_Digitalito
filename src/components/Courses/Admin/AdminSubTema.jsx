// GestionCursos.js

import React, { Fragment } from "react";
import { useParams } from 'react-router-dom';
import GestionInfo from "../Gestion/GestionInfo";
const AdminSubTema = () => {
  let { id } = useParams();
  return (
    <Fragment>
      <div className="p-3 mb-2 bg-dark vh-100 text-white border-white">
        <h1> Admin SubTema  {id}</h1>
        <GestionInfo id={id} tipo="SubTema" />
      </div>
    </Fragment>
  );
};
export default AdminSubTema;