import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';


import { login } from "./API/redisConnection"

export function Login() {
    //useNavigate es para poder navegar a otra ventana
    let navigate = useNavigate();


    const [username, setUsername] = useState(""); //Variable reactiva 
    const [contraseña, setContraseña] = useState("");

    const loginUsuario = async () => {
        const response = await login(username);
        const password = response.password;
        const tipoUsuario = response.es_profesor;

        //Validar no venga info vacia
        if (username === "" || contraseña === "") return alert("Debes llenar todos los campos");
        else {
            if (response !== "") {
                if (contraseña === password) {
                    console.log("Inicio de sesión exitoso");
                    alert("Inicio de sesión exitoso");
                    //Validar tipo usuario para redirigir menu
                    if (tipoUsuario === "true") {
                        navigate(`/adminMenu?username=${username}`);
                    } else {

                        navigate(`/ClientMenu?username=${username}`);
                    }
                } else {
                    console.log("Inicio de sesión fallido");
                    alert("Inicio de sesión fallida. Intente de nuevo");
                }
            }
        }

    };

    const handleRegistrarse = () => {
        navigate('/register', {});
    }

    return (
        <Fragment>
            <div class="p-3 mb-2 bg-dark vh-100">
                <div className="jumbotron justify-content-center w-25 mx-auto my-2">

                    <h1 className="fw-bold mb-5 text-center text-white">Inicio de sesión</h1>
                    <div className="form-floating mx-5 my-2">
                        <input type="text" className="form-control" id="userNameInput" placeholder="Cuenta usuario"
                            onChange={(event) => {
                                setUsername(event.target.value);
                            }} />
                        <label for="userNameInput">Usuario</label>
                    </div>

                    <div className="form-floating mx-5 my-2">
                        <input type="password" class="form-control" id="userPswrdInput" placeholder="Contraseña"
                            onChange={(event) => {
                                setContraseña(event.target.value);
                            }} />
                        <label for="userPswrdInput">Contraseña</label>
                    </div>

                    <div className="row g-3 my-2 mb-5">
                        <div className="col">
                            <button onClick={loginUsuario} className="w-100 btn btn-lg btn-primary">Ingresar</button>
                        </div>
                        <div className="col">
                            <button onClick={handleRegistrarse} className="w-100 btn btn-lg btn-secondary">Registrarse</button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}