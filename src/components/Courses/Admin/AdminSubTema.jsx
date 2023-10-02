// GestionCursos.js

import React, { Fragment } from "react";
import { useParams } from 'react-router-dom';
const AdminSubTema = () => {
  let { id } = useParams();
  return (
    <Fragment>
      <h1> Admin SubTema  {id}</h1>

    </Fragment>
  );
};
export default AdminSubTema;