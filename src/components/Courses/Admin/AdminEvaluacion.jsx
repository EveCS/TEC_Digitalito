// GestionCursos.js

import React, { Fragment, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

const AdminEvaluacion = () => {

  let { id } = useParams();
  return (
    <Fragment>
      <h1> Admin Evaluacion  {id}</h1>

    </Fragment>
  );
};
export default AdminEvaluacion;