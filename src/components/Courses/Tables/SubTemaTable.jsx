import React, { Fragment } from "react";
import '../style.css'
const SubTemaTable = ({ SubTemas, setSubTemaForm, eliminarSubTema }) => {
    return (
        <Fragment>
            <h1>Lista de SubTemas  </h1>
            <table className="table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Descripción</th>

                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {SubTemas ? (
                        SubTemas.map((SubTema) => (
                            <tr key={SubTema._id}>
                                <td>
                                    <a href={`/adminSubTema/${SubTema._id}`} rel="noopener noreferrer">
                                        <i className="fa fa-external-link"></i>
                                        {SubTema._id}
                                    </a>
                                </td>
                                <td>{SubTema.nombre}</td>
                                <td>{SubTema.descripcion}</td>

                                <td>
                                    <button onClick={() => setSubTemaForm(SubTema)}>Editar</button>
                                    <button onClick={() => eliminarSubTema(SubTema._id)}>Eliminar</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6">No hay Temas disponibles</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <hr></hr>
        </Fragment>
    );
};
export default SubTemaTable;