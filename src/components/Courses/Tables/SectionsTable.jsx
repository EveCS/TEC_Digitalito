import React, { Fragment } from "react";
import '../style.css'
const SectionsTable = ({ Secciones, setSeccionForm, eliminarSeccion }) => {
    return (
        <Fragment>
            <h1>Lista de Secciones  </h1>
            <table className="table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Fecha de Inicio</th>
                        <th>Fecha Final</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {Secciones ? (
                        Secciones.map((Seccion) => (
                            <tr key={Seccion._id}>
                                <td>
                                    <a href={`/adminSeccion/${Seccion._id}`} target="_blank" rel="noopener noreferrer">
                                        <i className="fa fa-external-link"></i>
                                        {Seccion._id}
                                    </a>
                                </td>
                                <td>{Seccion.nombre}</td>
                                <td>{Seccion.descripcion}</td>
                                <td>{Seccion.fechaInicio}</td>
                                <td>{Seccion.fechaFinal}</td>
                                <td>
                                    <button onClick={() => setSeccionForm(Seccion)}>Editar</button>
                                    <button onClick={() => eliminarSeccion(Seccion._id)}>Eliminar</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6">No hay Secciones disponibles</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <hr></hr>
        </Fragment>
    );
};
export default SectionsTable;