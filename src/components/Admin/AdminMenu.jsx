import React, { Fragment, useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.min.css";

export function AdminMenu() {
  let navigate = useNavigate();
  const queryParams = new URLSearchParams(useLocation().search);
  const username = queryParams.get('username');
  return (
    <Fragment>
      <div class="p-3 mb-2 bg-dark vh-100">
        <div className="jumbotron justify-content-center mx-auto my-2">
          <h1 className="fw-bold mb-5 text-center text-white">
            Pagina de profesores
          </h1>
          <div className="d-grid gap-2 col-6 mx-auto">
            <button
              onClick={() => { navigate('/gestionCursos', { state: { usuario: username } }) }}
              className="btn btn-primary mb-3 btn-lg"
              type="button"
            >
              Gestión de cursos
            </button>
            <button
              onClick={() => { navigate('/estudiantesEnCurso', {}) }}
              className="btn btn-primary mb-3 btn-lg"
              type="button"
            >
              Ver estudiantes en un curso
            </button>
            <button
              onClick={() => {navigate('/EvaluationFormJhonn',{})}}
              className="btn btn-primary mb-3 btn-lg"
              type="button"
              >
              Crear evaluaciones
            </button>
            <button
              onClick={() => {navigate('/..',{})}}
              className="btn btn-primary mb-3 btn-lg"
              type="button"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
