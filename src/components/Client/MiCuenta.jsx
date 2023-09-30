import React, { Fragment, useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from 'react-hook-form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getUser } from "../API/redisConnection";

export function MiCuenta() {
    //useNavigate es para poder navegar a otra ventana
    let navigate = useNavigate();
    //useLocation se usa para recibir los datos que se le pasan de la ventana anterior
    const location = useLocation();
    const username = location.state.usuario;
    console.log(username);
    
    const [contraseñaActual, setContraseñaActual] = useState("");
    const [contraseñaNueva, setContraseñaNueva] = useState("");
    const [confirmarContraseña, setConfirmarContraseña] = useState("");

    const cambiarValor = async () => {

        const usuarioRef = await getUser(username);

        /*if(contraseña == contraseñaActual){
            console.log("Contraseña Actual correcta");
            if(contraseñaNueva == confirmarContraseña){
                console.log("Contraseña confirmada correctamente");
                await updateDoc(usuarioRef,{
                    contraseña : confirmarContraseña
                  });
                  navigate('/clientMenu',{state:{usuario: username}});
            }
            else{
                console.log("Confirmación de contraseña incorrecta");
            }
        }
        else{
            console.log("Contraseña Actual Incorrecta");
        }*/
    };

    const Cancelar = () => {
        navigate('/clientMenu',{state:{usuario: username}});
    };

    return (
        <Fragment>
            <div class="vh-100 p-3 mb-2 bg-dark">
            <div className="jumbotron justify-content-center w-25 mx-auto my-2">

                <h1 className="fw-bold mb-5 text-center text-white">Mi Cuenta</h1>
                            <div className="form-floating mx-5 my-2">
                                <input type="text" className="form-control" id="currentPswrdInput" placeholder="Contraseña Actual"
                                onChange={(event) =>{
                                    setContraseñaActual(event.target.value);
                                }}/>
                                <label for="contraseñaActualInput">Contraseña Actual</label>
                            </div>

                            <div className="form-floating mx-5 my-2">
                                <input type="password" class="form-control" id="newPswrdInput" placeholder="Contraseña Nueva"
                                onChange={(event) =>{
                                    setContraseñaNueva(event.target.value);
                                }}/>
                                <label for="newPswrdInput">Contraseña Nueva</label>
                            </div>

                            <div className="form-floating mx-5 my-2">
                                <input type="password" class="form-control" id="confirmPswrdInput" placeholder="Confirmar Contraseña"
                                onChange={(event) =>{
                                    setConfirmarContraseña(event.target.value);
                                }}/>
                                <label for="confirmPswrdInput">Confirmar Contraseña</label>
                            </div>

                            <div className="my-5 mb-5">
                                <div className="col">
                                    <button onClick={cambiarValor} className="w-100 btn btn-lg btn-primary">Cambiar</button>
                                </div>
                                <div className="col">
                                    <button onClick={Cancelar} className="w-100 btn btn-lg btn-secondary my-3">Cancelar</button>
                                </div>
                            </div>
            </div>
            </div>
        </Fragment>
    )
}