import React, { Fragment, useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { getUser, getFriends,  addFriend} from "../API/redisConnection";

export function AddFriends() {
    //useNavigate es para poder navegar a otra ventana
    let navigate = useNavigate();
    //useLocation se usa para recibir los datos que se le pasan de la ventana anterior
    const location = useLocation();
    const username = location.state.usuario;

    const [newFriend, setFriend] = useState("");
    const [amigos, setAmigos] = useState([]);
    

    // dar estilo al texto en la tabla
    const estiloDeTexto = { align:"center", color: "White", };

    const AgregarAmigo = async () => {
        const response = await getUser(newFriend);
        const userFriend = response.username;

        console.log(userFriend);
        
        if (newFriend != "") {
            //Validar exista el usuario
            if (userFriend == newFriend) {
                console.log("Usuario registrado");
                
                //Agregar a la lista de amigos
                const insertFriend = await addFriend(username, newFriend);

                if (insertFriend) {
                    console.log("Amigo agregado");
                    alert("Amigo agregado");
                    window.location.reload();
                } else {
                    console.log("No se pudo agregar amigo");
                    alert("No se pudo agregar amigo");
                }
            } else {
                console.log("Este usuario no está registrado");
                alert("Este usuario no esta registrado");
            }
        }            
        else {
            return alert("Debes llenar el campo requerido");
        }
    };

    /*const VerAmigos = async () => {
        let varColor = "Black";
        //Sacar la data de amigos de la lista y mostrar en pantalla
        const listaAmigos = await getFriends(username);
        
    };*/

    useEffect(() => {
        const obtenerAmigos = async () => {
          const listaAmigos = await getFriends(username);
          setAmigos(listaAmigos);
        };
    
        obtenerAmigos();
     }, [username]);
    
    const BuscarAmigo = async () => {
        if (newFriend) return alert("Debes llenar el campo requerido");
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
                                <input type="text" className="form-control" id="userFriend" placeholder="Cuenta usuario amigo"
                                onChange={(event) =>{
                                    setFriend(event.target.value);
                                }}/>
                                <label for="userFriend">Usuario</label>
                            </div>

                            <div className="form-floating mx-5 my-2">
                                return (
                                    <div>
                                    <h2 style={estiloDeTexto}>Lista Amigos</h2>
                                    <ul>
                                        {amigos.map((amigo, index) => (
                                        <li style={estiloDeTexto} key={index}>{amigo}</li>
                                        ))}
                                    </ul>
                                    </div>
                                );                                
                            </div>

                            <div className="my-5 mb-5">
                                <div className="col">
                                    <button onClick={BuscarAmigo} className="w-100 btn btn-lg btn-primary">Buscar Amigo</button>
                                </div>
                                <div className="col">
                                    <button onClick={AgregarAmigo} className="w-100 btn btn-lg btn-primary  my-3">Agregar Amigo</button>
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
