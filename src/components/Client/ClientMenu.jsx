import React, { Fragment, useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from 'react-hook-form';
import 'bootstrap/dist/css/bootstrap.min.css';

export function ClientMenu() {
    //useNavigate es para poder navegar a otra ventana
    let navigate = useNavigate();
    const queryParams = new URLSearchParams(useLocation().search);
    const username = queryParams.get('username');

    const gestionarAmigos = () => {
        navigate('/AddFriends',{state:{usuario:username}});
    };

    const matriculaCursos = () => {
        navigate('/matricularcurso',{state:{usuario: username}});
    };

    const misCursos = () => {
        navigate('/misCursos',{state:{usuario: username}});
    };


    const editarCuenta = () => {
        navigate('/miCuenta',{state:{usuario: username}});
    };

    const hacerEvaluacion = () => {
        navigate('/hacerEvaluacion',{state:{usuario: username}});
    };
   

    return (
        <Fragment>
            <div>
            <div class="vh-100 p-3 mb-2 bg-dark">
                <div class="text-center">
                <h1 class="fw-bold mb-5 text-center text-white">Página Principal</h1>
                <br></br>
                <br></br>
                <div class="btn-group-vertical" role="group" aria-label="Vertical button group">
                    <button onClick={gestionarAmigos} type="button" class="w-200 btn btn-lg btn-primary">Mis Amigos</button>
                    <button onClick={misCursos} type="button" class="w-200 btn btn-lg btn-primary">Mis Cursos</button>
                
                    <button onClick={hacerEvaluacion} type="button" class="w-200 btn btn-lg btn-primary">Hacer evaluacion</button>
                    <button onClick={matriculaCursos} type="button" class="w-200 btn btn-lg btn-primary">Matricular</button>
                    <button onClick={editarCuenta} type="button" class="w-200 btn btn-lg btn-primary">Editar Cuenta</button>
                    <button onClick={() => {navigate('/..',{})}} type="button" class="w-200 btn btn-lg btn-primary">Cerrar Sesión</button>
                </div>
                </div>
            </div>
            </div>
        </Fragment>
    )
}