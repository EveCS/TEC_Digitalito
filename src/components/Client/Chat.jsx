import React, { Fragment, useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { getUser, getFriends,  addFriend} from "../API/redisConnection";
import { getchats } from "../API/neo4jConnection";

export function Chat() {
    //useNavigate es para poder navegar a otra ventana
    let navigate = useNavigate();
    //useLocation se usa para recibir los datos que se le pasan de la ventana anterior
    const location = useLocation();
    const username = location.state.usuario;

    //Envia un mensaje al usuario escogido, genera la conversación y los nodos Usuario si no existen
    const EnviarMensaje = async () => {

    };

    //Rescata las conversaciones abiertas que tiene el usuario
    const verConversaciones = async () => {
        const response = await getchats(username);

        //Rescata los nombres del archivo JSON extraído del API
        const convArr = [];
        for (const item of response) {
            const nombre = item.Nombre;
            console.log(nombre);
            convArr.push(nombre);
        }
    };

    const Cancelar = () => {
        navigate(`/ClientMenu?username=${username}`);
    };

    return (
        <Fragment>
        <div>
            <div class="vh-100 p-3 mb-2 bg-dark">
                <div className="jumbotron justify-content-center w-25 mx-auto my-2">

                    <h1 class="fw-bold mb-5 text-center text-white">Chats</h1>
                    
                    <div className="form-floating mx-5 my-2">
                        <input type="text" className="form-control" id="userContact" placeholder="Buscar usuario"/>
                        <label for="userContact">Buscar contacto</label>
                        <button onClick={verConversaciones} className="w-100 btn btn-lg btn-primary my-3">Iniciar conversacion</button>
                    </div>
                    
                    <div className="form-floating mx-5 my-2">
                        <select id="ddl_Conversaciones" className="form-control">
                            <option>Conv1</option>
                            <option>Conv2</option>
                            <option>Conv3</option>
                            <option>Conv4</option>
                        </select>
                    </div>

                    <div className="form-floating mx-5 my-2">
                        <input type="text" className="form-control" id="txt_message" placeholder="Escribe un mensaje..."/>
                        <label for="txt_message">Escribe un mensaje...</label>
                        <button onClick={EnviarMensaje} className="w-100 btn btn-lg btn-primary my-3">Enviar mensaje</button>
                    </div>
                </div>
            </div>
        </div>
        </Fragment>
    )
}