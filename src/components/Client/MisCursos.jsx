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


    console.log(matricula);
    return (
        <Fragment>
            
                        {matricula !== null && (
                            <div className="reservation">
                                <pre>
                                    {JSON.stringify(matricula, null, 2)}
                                </pre>
                            </div>
                        )}
                    
        </Fragment>
    );
    
}




