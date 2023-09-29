import React, { Fragment, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import CursoService from '../../services/CursoService';

const GestionCursos = () => {
  const [cursos, setCursos] = useState([]);
  let navigate = useNavigate();

  const getCursos = async () => {
    try {
      const data = await CursoService.obtenerCursos();
      setCursos(data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteCurso = async (id) => {
    try {
      await CursoService.eliminarCurso(id);
      const updatedCursos = cursos.filter(curso => curso.id !== id);
      setCursos(updatedCursos);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCursos();
  }, []);

  return (
    <Fragment>
      {/* ... (resto del código) ... */}
      <tbody>
        {cursos.map((curso) => (
          <tr key={curso.id}>
            {/* ... (resto del código) ... */}
            <td className="text-left">
              <Link to={`/editReservacion/${curso.id}`}>
                <i className="fa-solid fa-pen-to-square fa-2x" style={{ color: "white" }}></i>
              </Link>
            </td>
            <td>
              <button
                onClick={() => {
                  deleteCurso(curso.id);
                }}
                className="btn btn-danger"
              >
                Borrar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
      {/* ... (resto del código) ... */}
    </Fragment>
  );
};

export default GestionCursos;
