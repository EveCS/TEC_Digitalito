// GestionCursos.js

import React, { Fragment, useEffect, useState } from "react";

import '../style.css'



const CoursesTable = ({ cursos, getCursos, setCursoForm, connect }) => {

    // Delete a curso
    async function eliminarCurso(id) {
        try {
            await connect.CursoService.eliminarCurso(id);
            getCursos();
        } catch (error) {
            console.error(error);
        }
    }

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
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {cursos.map((curso) => (
                        <tr key={curso._id}>
                            <td>
                                <a href={`/adminCurso/${curso._id}`} rel="noopener noreferrer">
                                    <i className="fa fa-external-link"></i> {/* Add your icon class here */}

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
                            <td>
                                <button onClick={() => setCursoForm(curso)}>Editar</button>
                                <button onClick={() => eliminarCurso(curso._id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>


        </Fragment>

    );
};

export default CoursesTable;