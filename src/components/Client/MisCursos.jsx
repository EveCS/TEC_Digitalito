import React, { Fragment, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getCursosbyUser } from "../API/cassandraConnection";

export function MisCursos() {
    let navigate = useNavigate();
    const location = useLocation();
    const username = location.state.usuario;
    const [matricula, setMatricula] = useState([]);

    useEffect(() => {
        const fetchMatricula = async () => {
            try {
                const response = await getCursosbyUser(username);
                setMatricula(response);
            } catch (error) {
                console.error('Error al obtener matrícula:', error);
            }
        };

        fetchMatricula();
    }, [username]);

    return (
        <Fragment>
            <div className="p-3 mb-2 bg-dark vh-100">
                <div className="jumbotron justify-content-center w-50 mx-auto my-2">
                    <h1 className="fw-bold mb-5 text-center text-white">Mis cursos</h1>
                    <div className="reservations">
                        {matricula !== null && (
                            matricula.map((item, index) => (
                                <div className="reservation" key={index} style={{ color: "white" }}>
                                    <p>Estudiante: {item.estudiante_username}</p>
                                    <p>Curso ID: {item.curso_id}</p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </Fragment>
    );
}