import React, { Fragment } from "react";
import '../style.css'
const TemasTable = ({ Temas, setTemaForm, eliminarTema }) => {
    return (
        <Fragment>
            <h1>Lista de Temas  </h1>
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
                    {Temas ? (
                        Temas.map((Tema) => (
                            <tr key={Tema._id}>
                                <td>
                                    <a href={`/adminTema/${Tema._id}`} rel="noopener noreferrer">
                                        <i className="fa fa-external-link"></i>
                                        {Tema._id}
                                    </a>
                                </td>
                                <td>{Tema.nombre}</td>
                                <td>{Tema.descripcion}</td>

                                <td>
                                    <button onClick={() => setTemaForm(Tema)}>Editar</button>
                                    <button onClick={() => eliminarTema(Tema._id)}>Eliminar</button>
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
export default TemasTable;