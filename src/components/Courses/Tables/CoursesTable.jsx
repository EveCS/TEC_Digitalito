import React, { Fragment } from "react";
import '../style.css'
const CoursesTable = ({ cursos, setCursoForm, eliminarCurso, publicarCurso, duplicarCurso }) => {
    return (
        <Fragment>
            <h2 className="button-links">Lista de Cursos</h2>
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
                                <a href={`/adminCurso/${curso._id}`} rel="noopener noreferrer">

                                    {curso._id}
                                </a>
                            </td>
                            <td>{curso.codigo}</td>
                            <td>{curso.nombre}</td>
                            <td>{curso.descripcion}</td>
                            <td>{curso.fechaInicio}</td>
                            <td>{curso.fechaFin}</td>
                            <td><img src={`data:image/png;base64,${curso.foto}`}
                                alt={`Foto de ${curso.nombre}`} className="img-resize" /></td>

                            <td>{curso.publicado ? 'Yes' : 'No'}</td>
                            <td>{curso.username}</td>
                            <td>
                                <button onClick={() => setCursoForm(curso)}>Editar</button><br></br>
                                <button onClick={() => duplicarCurso(curso)}>Duplicar</button><br></br>
                                <button onClick={() => eliminarCurso(curso._id)}>Eliminar</button><br></br>
                                <button onClick={() => publicarCurso(curso._id, curso.publicado)}>{curso.publicado ? 'DesPublicar' : 'Publicar'}</button>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>


        </Fragment>

    );
};

export default CoursesTable;