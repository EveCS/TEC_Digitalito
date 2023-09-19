import React, { Fragment, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import 'bootstrap/dist/css/bootstrap.min.css';
import {db} from './firebase_config';
import { addDoc, collection, getDocs } from "firebase/firestore";

export function Login() {
    //useNavigate es para poder navegar a otra ventana
    let navigate = useNavigate();

    // Todos los inputs de la pagina de login
    // Todos estos datos se comparan con los existentes en firebase
    const [correo, setCorreo] = useState("");
    const [contraseña, setContraseña] = useState("");

    const [usuarios, setUsuarios] = useState([]);
    const usuariosCollectionRef = collection(db, "usuarios");

    useEffect(() => {
        const getUsuarios = async () => {
            const data = await getDocs(usuariosCollectionRef);
            setUsuarios(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
        };
        getUsuarios();
    }, []);

    const loginUsuario = async () => {
        let flag = false;
        
        for(let i in usuarios){
            //console.log(usuarios[i]);
            if(usuarios[i].correo == correo && usuarios[i].contraseña == contraseña && usuarios[i].eliminado == false){
                flag = true;
                if(usuarios[i].admin == true){
                    console.log("Inicio de sesión Administrador exitoso");
                    navigate('/adminMenu',{});
                }
                else{
                    const id = usuarios[i].id;
                    const carnee = usuarios[i].carnee; 
                    const nombre= usuarios[i].nombre;
                    const apellido = usuarios[i].apellido;
                    console.log(nombre);
                    console.log(apellido);
                    console.log("Inicio de sesión Estudiante exitoso");
                    navigate('/clientMenu',{state:{id: id, correo: correo, contraseña: contraseña, carnee: carnee, nombre: nombre, 
                                            apellido: apellido}});
                }
            }
        }
        if(flag === false){
            console.log("Inicio de sesión fallida. Intente de nuevo");
            alert("Inicio de sesión fallida. Intente de nuevo");
        }

    };
    
    const handleRegistrarse = () => {
        navigate('/register',{});
    }

    return (
        <Fragment>
            <div class="p-3 mb-2 bg-dark vh-100">
            <div className="jumbotron justify-content-center w-25 mx-auto my-2">

                <h1 className="fw-bold mb-5 text-center text-white">Inicio de sesión</h1>
                            <div className="form-floating mx-5 my-2">
                                <input type="text" className="form-control" id="userNameInput" placeholder="Correo de usuario"
                                onChange={(event) =>{
                                    setCorreo(event.target.value);
                                }}/>
                                <label for="userNameInput">Correo de usuario</label>
                            </div>

                            <div className="form-floating mx-5 my-2">
                                <input type="password" class="form-control" id="userPswrdInput" placeholder="Contraseña"
                                onChange={(event) =>{
                                    setContraseña(event.target.value);
                                }}/>
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