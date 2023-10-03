import React, { Fragment } from "react";
import '../style.css'
import DownloadButton from "./DownloadButton";
const InfoTable = ({ Infos, setInfoForm, eliminarInfo }) => {
    return (
        <Fragment>
            <h1>Lista de Informacion  </h1>
            <table className="table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Nombre Archivo</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {Infos ? (
                        Infos.map((Info) => (
                            <tr key={Info._id}>
                                <td>
                                    <a href={`/adminInfo/${Info._id}`} rel="noopener noreferrer">
                                        <i className="fa fa-external-link"></i>
                                        {Info._id}
                                    </a>
                                </td>
                                <td>{Info.nombre}</td>
                                <td>{Info.descripcion}</td>
                                <td> <DownloadButton base64Data={Info.file} filename={Info.filename} /> </td>
                                <td>
                                    <button class="btn btn-primary" onClick={() => setInfoForm(Info)}>Editar</button>
                                    <button class="btn btn-primary" onClick={() => eliminarInfo(Info._id)}>Eliminar</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6">No hay Info disponibles</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <hr></hr>
        </Fragment>
    );
};
export default InfoTable;