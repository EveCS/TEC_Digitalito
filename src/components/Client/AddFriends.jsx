import React, { Fragment, useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { getFriends,  addFriend} from "../API/redisConnection";

export function AddFriends() {
    //useNavigate es para poder navegar a otra ventana
    let navigate = useNavigate();
    //useLocation se usa para recibir los datos que se le pasan de la ventana anterior
    const location = useLocation();
    const username = location.state.usuario;
    
    const [newFriend, setFriend] = useState("");
    const [newValue, setValue] = useState("");

    const AgregarAmigo = () => {
        navigate(`/ClientMenu?username=${username}`);
    };

    const VerAmigo = () => {
        navigate(`/ClientMenu?username=${username}`);
    };

    const Cancelar = () => {
        navigate(`/ClientMenu?username=${username}`);
    };

    return (
        <Fragment>
            <div class="vh-100 p-3 mb-2 bg-dark">
            <div className="jumbotron justify-content-center w-25 mx-auto my-2">

                <h1 className="fw-bold mb-5 text-center text-white">Agregar Amigo</h1>

                            <div className="form-floating mx-5 my-2">
                                <input type="text" class="form-control" id="newFriend" placeholder="newFriend"
                                onChange={(event) =>{
                                    setFriend(event.target.value);
                                }}/>
                                <label for="newValue">Usuario Amigo</label>
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
                                    <button onClick={AgregarAmigo} className="w-100 btn btn-lg btn-primary">Agregar Amigo</button>
                                </div>
                                <div className="col">
                                    <button onClick={VerAmigo} className="w-100 btn btn-lg btn-primary my-3">Ver Amigos</button>
                                </div>
                                <div className="col">
                                    <button onClick={Cancelar} className="w-100 btn btn-lg btn-secondary">Cancelar</button>
                                </div>
                            </div>
            </div>
            </div>
        </Fragment>
    )
}