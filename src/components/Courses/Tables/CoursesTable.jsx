import React, { Fragment } from "react";
import '../style.css'
const CoursesTable = ({ cursos, setCursoForm, eliminarCurso, publicarCurso, duplicarCurso }) => {
    function formatDate(dateString) {
        if (dateString) {
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            return new Date(dateString).toLocaleDateString(undefined, options);
        }

    }
    return (
        <Fragment>
            <div className=" bg-dark  text-white border-white">
                <h2 className="button-links"> Cursos</h2>
                <table className="table-bordered">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Código</th>
                            <th>Nombre</th>
                            <th>Descripción</th>
                            <th>Fecha Inicio</th>
                            <th>Fecha Fin</th>
                            <th>Foto</th>
                            <th>Publicado</th>
                            <th>Creado Por: </th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cursos.map((curso) => (
                            <tr key={curso._id}>
                                <td>
                                    <a className="w-100 btn btn-lg btn-info" href={`/adminCurso/${curso._id}`} rel="noopener noreferrer">
                                        Ver
                                    </a>
                                </td>
                                <td>{curso.codigo}</td>
                                <td>{curso.nombre}</td>
                                <td>{curso.descripcion}</td>
                                <td>{formatDate(curso.fechaInicio)}</td>
                                <td>{formatDate(curso.fechaFin)}</td>
                                <td><img src={`data:image/png;base64,${curso.foto}`}
                                    alt={`Foto de ${curso.nombre}`} className="img-resize" /></td>

                                <td>{curso.publicado ? 'Yes' : 'No'}</td>
                                <td>{curso.username}</td>
                                <td>
                                    <button className="w-100 btn btn-lg btn-secondary mb-2" onClick={() => setCursoForm(curso)}>Editar</button><br></br>
                                    <button className="w-100 btn btn-lg btn-warning mb-2" onClick={() => duplicarCurso(curso)}>Duplicar</button><br></br>
                                    <button className="w-100 btn btn-lg btn-danger mb-2" onClick={() => eliminarCurso(curso._id)}>Eliminar</button><br></br>
                                    <button className="w-100 btn btn-lg btn-info" onClick={() => publicarCurso(curso._id, curso.publicado)}>{curso.publicado ? 'DesPublicar' : 'Publicar'}</button>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </Fragment>

    );
};

export default CoursesTable;