
import React, { Fragment } from "react";
import '../style.css'
const EvaluationsTable = ({ Evaluaciones, setEvaluacionForm, eliminarEvaluacion }) => {
    return (
        <Fragment>
            <h1> Evaluaciones  </h1>
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
                                    <a href={`/adminEvaluacion/${Evaluacion._id}`} rel="noopener noreferrer">

                                        {Evaluacion._id}
                                    </a>
                                </td>
                                <td>{Evaluacion.nombre}</td>
                                <td>{Evaluacion.descripcion}</td>
                                <td>{Evaluacion.fechaInicio}</td>
                                <td>{Evaluacion.fechaFinal}</td>
                                <td>
                                    <button className="btn btn-primary" onClick={() => setEvaluacionForm(Evaluacion)}>Editar</button>
                                    <button className="btn btn-primary" onClick={() => eliminarEvaluacion(Evaluacion._id)}>Eliminar</button>
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