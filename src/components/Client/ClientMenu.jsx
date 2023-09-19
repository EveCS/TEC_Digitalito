import React, { Fragment, useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from 'react-hook-form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { db } from '../firebase_config';

export function ClientMenu() {
    //useNavigate es para poder navegar a otra ventana
    let navigate = useNavigate();
    //useLocation se usa para recibir los datos que se le pasan de la ventana anterior
    const location = useLocation();
    const id = location.state.id;
    const correo = location.state.correo
    const contraseña = location.state.contraseña
    const carnee = location.state.carnee
    const nombre = location.state.nombre
    const apellido = location.state.apellido
    console.log(id, correo, contraseña, carnee, nombre, apellido);

    const ApartarCubiculo = () => {
        navigate('/reservarCubiculo',{state:{id: id, correo: correo, contraseña: contraseña, carnee: carnee, nombre: nombre, apellido: apellido}});
    };

    const ListaApartados = () => {
        navigate('/clientReservations',{state:{id: id, correo: correo, contraseña: contraseña, carnee: carnee, nombre: nombre, apellido: apellido}});
    };

    const Cuenta = () => {
        navigate('/miCuenta',{state:{id: id, correo: correo, contraseña: contraseña, carnee: carnee, nombre: nombre, apellido: apellido}});
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
                    <button onClick={ApartarCubiculo} type="button" class="w-200 btn btn-lg btn-primary">Apartar un Cubículo</button>
                    <button onClick={ListaApartados} type="button" class="w-200 btn btn-lg btn-primary">Lista de Apartados</button>
                    <button onClick={Cuenta} type="button" class="w-200 btn btn-lg btn-primary">Mi Cuenta</button>
                    <button onClick={() => {navigate('/..',{})}} type="button" class="w-200 btn btn-lg btn-primary">Cerrar Sesión</button>
                </div>
                </div>
            </div>
            </div>
        </Fragment>
    )
}