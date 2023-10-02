import React, { Fragment, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import connect from '../API/mongoConnection';



export function BuscarCursos() {
    let navigate = useNavigate();
    const location = useLocation();
    const [curso, setCurso] = useState("");  
    const [matricula, setMatricula] = useState([]);

    const fetchCurso = async () => {
        try {
            const response = await connect.CursoService.obtenerCursosPorID(curso);
            setMatricula(response);
        } catch (error) {
            console.error('Error al obtener matrícula:', error);
        }
    };

    


    console.log(matricula);
    return (
        <Fragment>
            <div class="p-3 mb-2 bg-dark vh-100">
                <div className="jumbotron justify-content-center mx-auto my-2">
                    <h1 className="fw-bold mb-5 text-center text-white">Buscar cursos</h1>
                    <div className="d-grid gap-2 col-6 mx-auto">
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Ingrese el nombre de usuario" 
                            value={curso} 
                            onChange={(e) => setCurso(e.target.value)}
                            style={{ width: "300px" }} 
                        />
                        <button 
                            className="btn btn-outline-secondary" 
                            type="button" 
                            onClick={fetchCurso} 
                        >
                            Buscar
                        </button>
                    </div>
                    <div className="reservation" style={{ maxHeight: "300px", overflowY: "scroll" }}>
    <pre style={{ color: "#fff" }}>
        {JSON.stringify(matricula, null, 2)}
    </pre>
</div>
                </div>
            </div>
        </Fragment>
    );
}