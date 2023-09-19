import React, { Fragment, useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from 'react-hook-form';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    addDoc,
    collection,
    updateDoc,
    getDocs,
    getDoc,
    doc,
    Timestamp
  } from "firebase/firestore";
import { db } from "../firebase_config";

var divStyle = {
    color: 'white',
    padding: '10px',
    fontSize: '12px',
    alignContent: 'flex-end'
};

export function Reservas() {
    const [reservaciones, setReservaciones] = useState([]);
    const reservacionesCollectionRef = collection(db, "reservaciones");
    const coleccionBloqueos = collection(db, "horarioBloqueos");
    const [bloqueos, setBloqueos] = useState([]);
    const [searchCubiculo, setSearchCubiculo] = useState("");
    const [cubiculos, setCubiculos] = useState([]);
    const cubiculosCollectionRef = collection(db, "cubiculos");
    const [newFecha, setFecha] = useState("");
    const [searchInputCapacidad, setSearchInputCapacidad] = useState("");
    const [searchInputSE, setSearchInputSE] = useState("");
    const [newHoraInicio, setHoraInicio] = useState("");
    const [newHoraFinal, setHoraFinal] = useState("");

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
    console.log(carnee, nombre, apellido);
    const nombreEstudiante= nombre+" "+apellido;
    console.log("AQUI: ",nombreEstudiante );

    useEffect(() => {
        const getCubiculos = async () => {
            const data = await getDocs(cubiculosCollectionRef);
            setCubiculos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
        };
        getCubiculos();
    }, []);

    useEffect(() => {
        console.log(cubiculos);
    
    }, [cubiculos]);

    const data = {
        searchCubiculo: searchCubiculo,
      };

    const getReservaciones = async () => {
        const data = await getDocs(reservacionesCollectionRef);
        const reservaciones = data.docs
          .map((doc) => ({ ...doc.data(), id: doc.id }))
          .filter(
            (reservacion) =>
              reservacion.activa /*&&
              reservacion.cubiculo.toString()*/
          );
        setReservaciones(reservaciones);
        //console.log("ESTOOOO: ",reservaciones);
    };
    
    useEffect(() => {
        getReservaciones();
      }, [searchCubiculo]);
    
    useEffect(() => {
      const getBloqueos = async () => {
        const data = await getDocs(coleccionBloqueos);
        const bloqueos = data.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }));
        setBloqueos(bloqueos);
        //console.log("ESTOOOO: ",reservaciones);
      };
      getBloqueos();
    }, []);

    useEffect(() => {
      console.log(bloqueos);
  
    }, [bloqueos]);
    
    const handleChangeCapacidad = async (e) => {
        e.preventDefault();
        setSearchInputCapacidad(e.target.value);

      
        if (e.target.value === "") {
          const data = await getDocs(cubiculosCollectionRef);
          const cubiculos = data.docs
            .map((doc) => ({ ...doc.data(), id: doc.id }))
            .filter((cubiculos) => cubiculos.capacidad);
          setCubiculos(cubiculos);
        } else {
          const data = await getDocs(cubiculosCollectionRef);
          const cubiculos = data.docs
            .map((doc) => ({ ...doc.data(), id: doc.id }))
            .filter(
              (cubiculos) =>
              cubiculos.disponible &&
              cubiculos.capacidad.toString().includes(e.target.value)
            );
            setCubiculos(cubiculos);
        }
    };

    const handleChangeServiciosEspeciales = async (e) => {
        e.preventDefault();
        setSearchInputSE(e.target.value);

      
        if (e.target.value === "") {
          const data = await getDocs(cubiculosCollectionRef);
          const cubiculos = data.docs
            .map((doc) => ({ ...doc.data(), id: doc.id }))
            .filter((cubiculos) => cubiculos.tipo);
          setCubiculos(cubiculos);
        } else {
          const data = await getDocs(cubiculosCollectionRef);
          const cubiculos = data.docs
            .map((doc) => ({ ...doc.data(), id: doc.id }))
            .filter(
              (cubiculos) =>
              cubiculos.disponible &&
              cubiculos.tipo.toString().includes(e.target.value)
            );
            setCubiculos(cubiculos);
        }
    };

    useEffect(() => {
        console.log(reservaciones);
      }, [reservaciones]);

    function ApartarCubiculo(numeroCubiculo){

      const reservacionesCollectionRef = collection(db, "reservaciones");
      // Obtener valor timestamp
      const dateInput = document.getElementById('date-input').value; // format: 'YYYY-MM-DD'
      const timeInput_start = document.getElementById('time-input-start').value; // format: 'HH:mm'
      const timeInput_end = document.getElementById('time-input-end').value; // format: 'HH:mm'
      const isoString_start = dateInput + 'T' + timeInput_start + ':00';
      const isoString_end = dateInput + 'T' + timeInput_end + ':00';
      const timestamp_start = new Date(isoString_start);
      const timestamp_end = new Date(isoString_end);
      const timestampMs_start = timestamp_start.getTime();
      const timestampMs_end = timestamp_end.getTime();
      const difference = (timestampMs_end) - (timestampMs_start);
      const hours = Math.floor(difference / 3600000);
      console.log(hours);
      //Estos son los valores timestamp de las horas
      const horaInicio_aux= Timestamp.fromMillis(timestampMs_start);
      const horaFinal_aux= Timestamp.fromMillis(timestampMs_end);  
      let flag = false;
      if(newFecha == "" || newHoraInicio == "" || newHoraFinal == ""){
        flag = true;
      }

      let choque = false;
      let maximoUso = false;
      for(let i in reservaciones){
        if(reservaciones[i].cubiculo == numeroCubiculo){

          // Validar que no haya choque de input de horas con horarios existentes
          if((horaInicio_aux >= reservaciones[i].hora && horaInicio_aux <= reservaciones[i].horaFinal) ||
            (horaFinal_aux >= reservaciones[i].hora && horaFinal_aux <= reservaciones[i].horaFinal) || 
            (horaInicio_aux <= reservaciones[i].hora && horaFinal_aux >= reservaciones[i].horaFinal)){
              choque = true;
            } 
        }
      };
      for(let i in cubiculos){
        if(cubiculos[i].numeroCubiculo==numeroCubiculo){
          console.log(cubiculos[i].maximoTiempoUso);
          if(hours>cubiculos[i].maximoTiempoUso && cubiculos[i].maximoTiempoUso>0){
            maximoUso = true;
          }
        }
      };
      for(let i in bloqueos){
        if(bloqueos[i].cubiculo == numeroCubiculo){
          // Validar que no haya choque de input de horas con horarios existentes
          if((horaInicio_aux >= bloqueos[i].fechaInicio && horaInicio_aux <= bloqueos[i].fechaFin) ||
            (horaFinal_aux >= bloqueos[i].fechaInicio && horaFinal_aux <= bloqueos[i].fechaFin) || 
            (horaInicio_aux <= bloqueos[i].fechaInicio && horaFinal_aux >= bloqueos[i].fechaFin)){
              choque = true;
            }
            
        }
      };
      if(flag == true){
        alert('Debe ingresar una fecha, hora inicio y hora final, no pueden estar vacios');
      }
      else{
        if (choque==true || maximoUso==true) {
          if(maximoUso==true){
            alert("Su reservación sobrepasa la cantidad máxima de horas permitidas establecida.")
          }
          else{
            alert("Este horario NO está disponible para este cubículo.")
          }
        }
        else{
          const activaFlag = true;
          const confirmadaFlag = false;
          const data = {
              activa: activaFlag,
              carnee: carnee,
              confirmada: confirmadaFlag,
              cubiculo: numeroCubiculo,
              estudiante: nombreEstudiante,
              fecha: newFecha,
              hora: horaInicio_aux,
              horaFinal: horaFinal_aux,
          };
          alert("Reservacion realizada exitosamente")
          addDoc(reservacionesCollectionRef, data);
        }
        navigate('/clientMenu',{state:{id: id, correo: correo, contraseña: contraseña, carnee: carnee, nombre: nombre, apellido: apellido}});
      }
    };

    const Volver = () => {
      navigate('/clientMenu',{state:{id: id, correo: correo, contraseña: contraseña, carnee: carnee, nombre: nombre, apellido: apellido}});
  }


    return (
        <Fragment>
      <div  class="vh-500 p-3 mb-2 bg-dark">
        <div className="jumbotron justify-content-center w-25 mx-auto my-2">
          <h1 className="fw-bold mb-5 text-center text-white">
            Reservar Cubículo
          </h1>
        <div>
            <input
            type="date"
            id="date-input"
            className="form-control"
            placeholder="fecha"
            onChange={(event) =>{
                setFecha(event.target.value);
            }}
            />
        </div>
        <div>
            <input
            type="int"
            className="form-control mt-1"
            placeholder="capacidad"
            onChange={handleChangeCapacidad}
            value={searchInputCapacidad}
            />
        </div>
        <div>
            <input
            type="int"
            className="form-control mt-1"
            placeholder="servicios especiales"
            onChange={handleChangeServiciosEspeciales}
            value={searchInputSE}
            />
        </div>
        <div>
            <label className="text-white" for="time-input-start">Hora Inicio:</label>
            <input
            type="time"
            id="time-input-start"
            className="form-control mt-1"
            placeholder="hora inicio"
            onChange={(event) =>{
                setHoraInicio(event.target.value);
            }}
            />
        </div>
        <div>
            <label className="text-white" for="time-input-end">Hora Final:</label>
            <input
            type="time"
            id="time-input-end"
            className="form-control mt-1"
            placeholder="hora final"
            onChange={(event) =>{
                setHoraFinal(event.target.value);
            }}
            />
        </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col">
              <table className=" table table-dark table-hover">
                <thead>
                  <tr>
                    <th>Número de cubículo</th>
                    <th>Capacidad</th>
                    <th>Servicios especiales</th>
                    <th>Reservar</th>

                  </tr>
                </thead>
                <tbody>
                  {cubiculos.map((cubiculos) => (
                    <tr key={cubiculos.id}>
                      <td>{cubiculos.numeroCubiculo}</td>
                      <td>{cubiculos.capacidad}</td>
                      <td>{cubiculos.tipo}</td>
                      <td>
                        <button
                          onClick={() => ApartarCubiculo(cubiculos.numeroCubiculo)}
                          className="btn btn-success"
                        >
                          Reservar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <h1 style={divStyle}>
                    Leyenda
                </h1>
                <h1 style={divStyle}>
                    Servicio especial 1: 

                        NVDA: programa parlante que lee el texto.
                </h1>
                <h1 style={divStyle}>
  
                    Servicio especial 2: 
                         Lanbda 1.4: software para la edición de textos matemáticos basada en la utilización de ordenadores PC con sistema operativo Microsoft Windows, compatible con el revisor de pantalla.
                </h1>
                <h1 style={divStyle}>
                    Servicio especial 3:

                    JAWS: Ofrece una interoperabilidad entre usuarios ciegos y videntes, mediante la utilización de líneas braille, sintetizadores de voz, pantalla e impresoras, tanto en tinta como braille.
                </h1>
              </table>
            </div>
          </div>
        </div>
        <button
          onClick={Volver}
          className="btn btn-primary"
          >
            Volver
        </button>
    </div>


    </Fragment>
  );
};