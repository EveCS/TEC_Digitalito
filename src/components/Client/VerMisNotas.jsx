import React, { Fragment, useEffect, useState } from "react";
import { getNotasPorUser } from '../API/cassandraConnection';

import { useLocation } from "react-router-dom";

 const VerNotas = () => {

    const location = useLocation();
    const username = location.state.usuario;
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log("llegue");
                const response = await getNotasPorUser(username);
                setData(response);
                console.log(data);
            } catch (error) {
                console.error('Error al obtener el examen:', error);
            }
        };
    
        fetchData();
    }, [username]);

    return (
        <div style={{ background: '#343a40', color: '#FFF', padding: '1rem' }}>
        <h1 style={{ textAlign: 'center' }}>Evaluaciones</h1>
        <div className="container mt-4">
            {data.map((item, index) => (
                <div style={{ background: '#343a40', border: 'none' }} key={index}>
                    <div className="card-body">

                        <p className="card-text">Evaluación ID: {item.evaluacion_id}</p>
                        <p className="card-text">Curso ID: {item.curso_id}</p>
                        <p className="card-text">Nota: {item.nota}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
);
};

export default VerNotas;
