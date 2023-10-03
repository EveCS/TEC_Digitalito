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
                        <th>Codigo</th>
                        <th>Nombre</th>
                        <th>Descripcion</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {Secciones ? (
                        Secciones.map((Seccion) => (
                            <tr key={Seccion._id}>
                                <td>
                                    <a className="w-100 btn btn-lg btn-primary " href={`/adminSeccion/${Seccion._id}`} rel="noopener noreferrer">
                                        <i className="fa fa-external-link"></i>&nbsp;
                                        Ver
                                    </a>
                                </td>
                                <td>{Seccion.codigo}</td>
                                <td>{Seccion.nombre}</td>
                                <td>{Seccion.descripcion}</td>

                                <td>
                                    <button className="w-100  btn btn-lg btn-secondary mb-2" onClick={() => setSeccionForm(Seccion)}>Editar</button>
                                    <button className="w-100 btn btn-lg btn-secondary" onClick={() => eliminarSeccion(Seccion._id)}>Eliminar</button>
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