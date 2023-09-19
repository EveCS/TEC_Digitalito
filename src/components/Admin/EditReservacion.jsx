import React, { Fragment, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  addDoc,
  collection,
  updateDoc,
  getDocs,
  getDoc,
  doc,
  Timestamp,
} from "firebase/firestore";
import { db } from "../firebase_config";
import { async } from "@firebase/util";

const EditReservacion = () => {
  const reservacionesCollectionRef = collection(db, "reservaciones");
  const coleccionBloqueos = collection(db, "horarioBloqueos");
  const cubiculosCollectionRef = collection(db, "cubiculos");
  const [bloqueos, setBloqueos] = useState([]);
  let navigate = useNavigate();
  let [cubiculo, setCubiculo] = useState("");
  const [cubiculos, setCubiculos] = useState([]);
  let [hora, setHora] = useState(new Date());
  let [horaFinal, setHoraFinal] = useState(new Date());
  let [fecha, setFecha] = useState("");
  let [carnee, setCarnee] = useState("");
  let [nombreEstudiante, setNombreEstudiante] = useState("");
  let [confirmada, setConfirmada] = useState();
  const [reservaciones, setReservaciones] = useState([]);
  const { id } = useParams();

  const handleCancelar = () => {
    navigate("/gestionReservaciones", {});
  };

  const getReservacionById = async (id) => {
    const reservacion = await getDoc(doc(db, "reservaciones", id));

    if (reservacion.exists()) {
      setCubiculo(reservacion.data().cubiculo);
      setHora(reservacion.data().hora.toDate());
      setHoraFinal(reservacion.data().horaFinal.toDate());
      setFecha(reservacion.data().fecha);
      setCarnee(reservacion.data().carnee);
      setNombreEstudiante(reservacion.data().estudiante);
      setConfirmada(reservacion.data().confirmada.toString());
    } else {
    }
  };

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

  useEffect(() => {
    getReservacionById(id);
  }, []);

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

  const getReservaciones = async () => {
    const data = await getDocs(reservacionesCollectionRef);
    const reservaciones = data.docs
      .map((doc) => ({ ...doc.data(), id: doc.id }))
      .filter((reservacion) => reservacion.activa);
    setReservaciones(reservaciones);
  };

  useEffect(() => {
    getReservaciones();
  }, []);

  useEffect(() => {
    console.log(reservaciones);
    const hours_ini = hora.getHours().toString().padStart(2, "0");
    const minutes_ini = hora.getMinutes().toString().padStart(2, "0");
    const formattedTime_ini = `${hours_ini}:${minutes_ini}`;
    const hours_fin = horaFinal.getHours().toString().padStart(2, "0");
    const minutes_fin = horaFinal.getMinutes().toString().padStart(2, "0");
    const formattedTime_fin = `${hours_fin}:${minutes_fin}`;
    setHoraFinal(formattedTime_fin);
    setHora(formattedTime_ini);
  }, [reservaciones]);

  const update = async (e) => {
    e.preventDefault();

    if (!/^\d+$/.test(cubiculo)) {
      alert("El número de cubículo solo debe contener números.");
      return navigate("/gestionReservaciones", {});
    }

    if (0 > cubiculo) {
      alert("El número de cubículo solo debe contener positivos.");
      return navigate("/gestionReservaciones", {});
    }
    let existe = false;
    for(let i in cubiculos){
      if(cubiculos[i].numeroCubiculo == cubiculo && cubiculos[i].eliminado==false){
        existe = true;
      }
    }
    if(existe==false){
      alert("El número de cubículo ingresado no existe");
      return navigate("/gestionReservaciones", {});
    }
    else{
      verificarChoque(cubiculo);
    }
  };

  async function verificarChoque(numeroCubiculo) {
    const dateInput = document.getElementById("date-input").value; // format: 'YYYY-MM-DD'
    const timeInput_start = document.getElementById("time-input-start").value; // format: 'HH:mm'
    const timeInput_end = document.getElementById("time-input-end").value; // format: 'HH:mm'
    const isoString_start = dateInput + "T" + timeInput_start + ":00";
    const isoString_end = dateInput + "T" + timeInput_end + ":00";
    const timestamp_start = new Date(isoString_start);
    const timestamp_end = new Date(isoString_end);
    const timestampMs_start = timestamp_start.getTime();
    const timestampMs_end = timestamp_end.getTime();
    const horaInicio_aux = Timestamp.fromMillis(timestampMs_start);
    const horaFinal_aux = Timestamp.fromMillis(timestampMs_end);
    const difference = (timestampMs_end) - (timestampMs_start);
    const hours = Math.floor(difference / 3600000);
    let choque = false;
    for (let reservacion of reservaciones) {
      console.log((timestamp_end - timestamp_start) / 3600000);
      console.log(reservacion);
      console.log(numeroCubiculo);
      if (reservacion.id === id) {
        // Ignorar la reserva actual
        continue;
      }
      if (reservacion.cubiculo == numeroCubiculo) {
        if (
          (horaInicio_aux >= reservacion.hora &&
            horaInicio_aux <= reservacion.horaFinal) ||
          (horaFinal_aux >= reservacion.hora &&
            horaFinal_aux <= reservacion.horaFinal) || 
          (horaInicio_aux <= reservacion.hora &&
            horaFinal_aux >= reservacion.horaFinal)
        ) {
          choque = true;
        }
      }
    }
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
    for(let i in cubiculos){
      if(cubiculos[i].numeroCubiculo==numeroCubiculo){
        console.log(cubiculos[i].maximoTiempoUso);
        if(hours>cubiculos[i].maximoTiempoUso && cubiculos[i].maximoTiempoUso>0){
          choque = true;
        }
      }
    };
    if (choque == true) {
      alert("Este horario NO está disponible para este cubículo.");
    } else {
      const reserva = doc(db, "reservaciones", id);
      console.log(confirmada);
      const data = {
        cubiculo: cubiculo,
        hora: horaInicio_aux,
        horaFinal: horaFinal_aux,
        fecha: fecha,
        carnee: carnee,
        confirmada: confirmada == "true" ? true : false,
        estudiante: nombreEstudiante,
      };
      await updateDoc(reserva, data);
      alert("Reservacion modificada exitosamente");
      navigate("/gestionReservaciones");
    }
  }
  return (
    <Fragment>
      <div className="p-3 mb-2 bg-dark vh-100">
        <div className="jumbotron justify-content-center mx-auto my-2">
          <h1 className="fw-bold mb-5 text-center text-white">
            Editar Reservación
          </h1>
        </div>
        <form onSubmit={update}>
          <div className="form-floating mx-5 my-2">
            <input
              type="int"
              className="form-control"
              placeholder="cubiculo"
              id="cubiculo"
              value={cubiculo}
              onChange={(event) => {
                setCubiculo(event.target.value);
              }}
            />
            <label htmlFor="numeroCubiculo">Número del cubículo</label>
          </div>

          <div className="form-floating mx-5 my-2">
            <input
              type="time"
              id="time-input-start"
              className="form-control mt-1"
              placeholder="hora inicio"
              value={hora}
              onChange={(event) => {
                setHora(event.target.value);
              }}
            />
            <label htmlFor="Capacidad">Hora</label>
          </div>

          <div className="form-floating mx-5 my-2">
            <input
              type="time"
              id="time-input-end"
              className="form-control mt-1"
              placeholder="hora inicio"
              value={horaFinal}
              onChange={(event) => {
                setHoraFinal(event.target.value);
              }}
            />
            <label htmlFor="disponible">Hora Final</label>
          </div>

          <div className="form-floating mx-5 my-2">
            <input
              type="date"
              id="date-input"
              className="form-control"
              placeholder="fecha"
              value={fecha}
              onChange={(event) => {
                setFecha(event.target.value);
              }}
            />
            <label htmlFor="tipo">Fecha</label>
          </div>

          <div className="form-floating mx-5 my-2">
            <input
              type="int"
              className="form-control"
              id="carnee"
              placeholder="carnee"
              value={carnee}
              onChange={(event) => {
                setCarnee(event.target.value);
              }}
            />
            <label htmlFor="tipo">Carné estudiante</label>
          </div>

          <div className="form-floating mx-5 my-2">
            <input
              type="text"
              className="form-control"
              id="nombreEstudiante"
              placeholder="nombreEstudiante"
              value={nombreEstudiante}
              onChange={(event) => {
                setNombreEstudiante(event.target.value);
              }}
            />
            <label htmlFor="tipo">Nombre estudiante</label>
          </div>

          <div className="form-floating mx-5 my-2">
            <Form.Check
              type="radio"
              label="True"
              name="confirmada"
              id="confirmada-true"
              value="true"
              style={{ color: "white" }}
              checked={confirmada === "true"}
              onChange={(event) => setConfirmada(event.target.value)}
            />

            <Form.Check
              type="radio"
              label="False"
              name="confirmada"
              id="confirmada-false"
              value="false"
              style={{ color: "white" }}
              checked={confirmada === "false"}
              onChange={(event) => setConfirmada(event.target.value)}
            />
          </div>

          <div className="row g-3 my-2 mb-5">
            <div className="col">
              <button className="w-100 btn btn-lg btn-primary">
                Confirmar
              </button>
            </div>
            <div className="col">
              <button
                onClick={handleCancelar}
                className="w-100 btn btn-lg btn-secondary"
              >
                Cancelar
              </button>
            </div>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default EditReservacion;

/*
 */
