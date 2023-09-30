import React, { Fragment, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { registerUser } from "./API/redisConnection";
import "../styles.css";

export function Register(){
    //useNavigate es para poder navegar a otra ventana
    let navigate = useNavigate();

    // Todos los inputs de la pagina de registro
    // Todos estos datos se envian al db para crear el usuario

    const passwordRegex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_]).{8,}$');
    const [newUser, setUserName] = useState("");
    const [newNombre, setNombre] = useState("");
    const [newFechaNacimiento, setFechaNacimiento] = useState("");
    const [newContrasenna, setContrasenna] = useState("");
    const [newAvatarUrl, setAvatarUrl] = useState("");
    const [newTipoUsuario, setTipoUsuario] = useState("");

    const [usuarios, setUsuarios] = useState([]);

        const crearUsuario = async () =>{
        let profesorFlag = false;

        //validacion password, comentada por facilidad
        /*if(!passwordRegex.test(newContrasenna)){
            alert('La constraseña no cumple con el formato solicitado, debe tener un mínimo de 8 carácteres, una mayúscula y minúscula y un carácter especial #?!@$%^&*-_');
        } else{*/
            if(newTipoUsuario === "Profesor") {
                profesorFlag = true;
            }
            const data = {
                //Cambiar campos y espacios variables reactivas
                username: newUser,
                password: newContrasenna,
                full_name: newNombre,
                dob: newFechaNacimiento,
                avatar_url: newAvatarUrl,
                es_profesor: profesorFlag
            };
            const responseRegistro = await registerUser(data);
            if(responseRegistro){
                navigate('/',{});
            } else {
                alert("Error al registrarse");
            }
            
    }
    
    const handleCancelar = () => {
        navigate('/',{});
    }
    return (
        <Fragment>
            <div class="p-3 mb-2 bg-dark">
                <div class="jumbotron justify-content-center w-25 mx-auto my-2">
                    
                    <h1 class="fw-bold mb-5 text-center text-white">Registro de usuario</h1>

                        <div className="form-floating mx-5 my-2">
                            <input type="text" className="form-control" id="username" placeholder="Usuario" 
                            onChange={(event) =>{
                                setUserName(event.target.value);
                            }}/>
                            <label for="username">Usuario</label>
                        </div>

                        <div className="form-floating mx-5 my-2">
                            <input type="text" class="form-control" id="full_name" placeholder="Nombre Completo"
                            onChange={(event) =>{
                                setNombre(event.target.value);
                            }}/>
                            <label for="full_name">Nombre completo</label>
                        </div>

                        <div className="form-floating mx-5 my-2">
                            <input type="text" class="form-control" id="url_avatar" placeholder="Url del avatar o foto perfil"
                            onChange={(event) =>{
                                setAvatarUrl(event.target.value);
                            }}/>
                            <label for="url_avatar">Avatar</label>
                        </div>

                        <div className="form-floating mx-5 my-2">
                            <input type="date" class="form-control" id="fechaNacimiento" placeholder="FechaNacimiento"
                            onChange={(event) =>{
                                setFechaNacimiento(event.target.value);
                            }}/>
                            <label for="fechaNacimiento">Fecha de Nacimiento</label>
                        </div>

                        <div className="form-floating mx-5 my-2">
                            <input type="password" class="form-control" id="contrasenna" placeholder="Contraseña"
                            onChange={(event) =>{
                                setContrasenna(event.target.value);
                            }}/>
                            <label for="contrasenna">Contraseña</label>
                        </div>

                        <div class="form-group mx-5 my-2">
                            
                            <label  for="tipoUsuario">
                                    <select id="tipoUsuario" newTipoUsuario={newTipoUsuario} onChange={(event) => setTipoUsuario(event.target.value)}>
                                        <option newTipoUsuario="Estudiante">Estudiante</option>
                                        <option newTipoUsuario="Profesor">Profesor</option>
                                    </select>
                            </label>
                        </div>

                        <div className="row g-3 my-2 mb-5">
                            <div className="col">
                                <button onClick={crearUsuario} className="w-100 btn btn-lg btn-primary">Confirmar</button>
                            </div>
                            <div className="col">
                                <button onClick={handleCancelar} className="w-100 btn btn-lg btn-secondary">Cancelar</button>
                            </div>
                        </div>
                </div>
            </div>

        </Fragment>
    )

}