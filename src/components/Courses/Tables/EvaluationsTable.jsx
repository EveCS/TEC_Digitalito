
import React, { Fragment } from "react";
import '../style.css'
const EvaluationsTable = ({ Evaluaciones, setEvaluacionForm, eliminarEvaluacion }) => {
    return (
        <Fragment>
            <h1>Lista de Evaluaciones  </h1>
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
                    {Evaluaciones ? (
                        Evaluaciones.map((Evaluacion) => (
                            <tr key={Evaluacion._id}>
                                <td>
                                    <a href={`/adminEvaluacion/${Evaluacion._id}`} target="_blank" rel="noopener noreferrer">
                                        <i className="fa fa-external-link"></i>
                                        {Evaluacion._id}
                                    </a>
                                </td>
                                <td>{Evaluacion.nombre}</td>
                                <td>{Evaluacion.descripcion}</td>
                                <td>{Evaluacion.fechaInicio}</td>
                                <td>{Evaluacion.fechaFinal}</td>
                                <td>
                                    <button onClick={() => setEvaluacionForm(Evaluacion)}>Editar</button>
                                    <button onClick={() => eliminarEvaluacion(Evaluacion._id)}>Eliminar</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6">No hay evaluaciones disponibles</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <hr></hr>
        </Fragment>
    );
};

export default EvaluationsTable;