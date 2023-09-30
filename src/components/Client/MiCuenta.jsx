import React, { Fragment, useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from 'react-hook-form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { editUserField, getUser } from "../API/redisConnection";

export function MiCuenta() {
    //useNavigate es para poder navegar a otra ventana
    let navigate = useNavigate();
    //useLocation se usa para recibir los datos que se le pasan de la ventana anterior
    const location = useLocation();
    const username = location.state.usuario;
    
    const [newField, setField] = useState("");
    const [newValue, setValue] = useState("");

    const cambiarValor = async () => {

        //Validar no esta vacio el espacio
        if(newValue != ""){
            let editarInfo;
            switch (newField) {
                case "Contraseña":
                    editarInfo = await editUserField(username, "password", newValue);
                    if(editarInfo) {
                        console.log("Éxito al actualizar contraseña");
                        alert("Éxito al actualizar contraseña");
                    } else {
                        console.log("Fallo actualizar contraseña");
                        alert("Fallo actualizar contraseña");
                    }
                  break;
                case "Nombre Completo":
                    editarInfo = await editUserField(username, "full_name", newValue);
                    if(editarInfo) {
                        console.log("Éxito al actualizar Nombre completo");
                        alert("Éxito al actualizar Nombre completo");
                    } else {
                        console.log("Fallo actualizar Nombre completo");
                        alert("Fallo actualizar Nombre completo");
                    }
                  break;
                case "Fecha Nacimiento":
                    editarInfo = await editUserField(username, "bod", newValue);
                    if(editarInfo) {
                        console.log("Éxito al actualizar Fecha Nacimiento");
                        alert("Éxito al actualizar Fecha Nacimiento");
                    } else {
                        console.log("Fallo actualizar Fecha Nacimiento");
                        alert("Fallo actualizar Fecha Nacimiento");
                    }
                  break;
                case "Url Avatar":
                    editarInfo = await editUserField(username, "avatar_url", newValue);
                    if(editarInfo) {
                        console.log("Éxito al actualizar Url");
                        alert("Éxito al actualizar Url");
                    } else {
                        console.log("Fallo actualizar Url");
                        alert("Fallo actualizar Url");
                    }
                  break;
                default:
                  console.log("Lo lamentamos, opción inválida " + newField + ".");
            } //Fin switch
        } else {
            console.log("Input vacío");
            alert("Debe llenar el espacio");
        }
    };

    const Cancelar = () => {
        navigate(`/ClientMenu?username=${username}`);
    };

    return (
        <Fragment>
            <div class="vh-100 p-3 mb-2 bg-dark">
            <div className="jumbotron justify-content-center w-25 mx-auto my-2">

                <h1 className="fw-bold mb-5 text-center text-white">Mi Cuenta</h1>

                            <div class="form-group mx-5 my-2">
                            <label  for="campoModificar">
                                    <select id="campoModificar" newField={newField} onChange={(event) => setField(event.target.value)}>
                                        <option newField="password">Contraseña</option>
                                        <option newField="full_name">Nombre Completo</option>
                                        <option newField="dob">Fecha Nacimiento</option>
                                        <option newField="avatar_url">Url Avatar</option>
                                    </select>
                            </label>                            
                            </div>

                            <div className="form-floating mx-5 my-2">
                                <input type="text" class="form-control" id="newValue" placeholder="Nuevo dato"
                                onChange={(event) =>{
                                    setValue(event.target.value);
                                }}/>
                                <label for="newValue">Nuevo Dato</label>
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