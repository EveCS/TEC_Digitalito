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
  where,
  query,
  Timestamp
} from "firebase/firestore";
import { db } from "../firebase_config";

const checkboxStyle = {
  color: "#fff",
  padding: "20px",
  marginLeft: "-10px",
  alignContent: "center",
  justify: "center",
};

var divStyle = {
  color: "white",
  padding: "10px",
  fontSize: "20px",
  alignContent: "flex-end",
  // marginLeft: '40px'
  justify: "center",
};

const EditarTiempoUso = () => {
  let navigate = useNavigate();
  let [numeroCubiculo, setNumeroCubiculo] = useState("");
  let [capacidad, setCapacidad] = useState("");
  let [disponible, setDisponible] = useState();
  let [tipo, setTipo] = useState("");
  let [maximoTiempo, setMaximoTiempo] = useState("");
  let [bloqueoInicio, setBloqueoInicio] = useState("");
  let [bloqueoFin, setBloqueoFin] = useState("");
  const [notificar, setNotificar] = useState(false);

  const [options, setOptions] = useState({
    option1: false,
    option2: false,
    option3: false,
  });

  function getSelectedOptions(options) {
    let selectedOptions = "";
    for (const key in options) {
      if (options[key]) {
        selectedOptions += key.slice(-1) + ",";
      }
    }
    return selectedOptions.slice(0, -1);
  }

  const { id } = useParams();

  const update = async (e) => {
    if (notificar) {
      // Implementar la lógica para enviar notificaciones a los correos de los estudiantes
    }
    e.preventDefault();
    const cubiculos = doc(db, "cubiculos", id);
    let modificado = false;
    //const cubiculoID= e.numeroCubiculo;
    //const cubiculoExists = await checkIfCubiculoExists(numeroCubiculo,cubiculoID);

    if(maximoTiempo!=''){
      if(disponible == "Disponible"){
        await updateDoc(cubiculos, {["maximoTiempoUso"]:maximoTiempo});
      }
      else{
        if(disponible==true){
          await updateDoc(cubiculos, {["maximoTiempoUso"]:maximoTiempo, ["disponible"]:"disponible"});
        }
        else{
          await updateDoc(cubiculos, {["maximoTiempoUso"]:maximoTiempo, ["disponible"]:"mantenimiento"});
        }
      }
      modificado=true;
    }
    if(bloqueoInicio == "" || bloqueoFin == ""){
      if(modificado){
        alert("El máximo tiempo de uso fue modificado exitosamente pero no se añadio ningún tiempo de bloqueo");

      }
      else{
        alert("No se generó ninguna modificación");
      }
      
    }
    else{
      const coleccionTiempos = collection(db, "horarioBloqueos");
      const datos = await getDocs(coleccionTiempos);
      const bloqueos = datos.docs.map((doc) => ({ ...doc.data(), id: doc.id}));
      console.log(bloqueos);
      const timeInicio = Timestamp.fromMillis((new Date(bloqueoInicio)).getTime());
      const timeFinal = Timestamp.fromMillis((new Date(bloqueoFin)).getTime());
      console.log(timeInicio);
      let error = false;
      for(let i in bloqueos){
        console.log(bloqueos[i].fechaInicio)
        if(bloqueos[i].cubiculo==numeroCubiculo){
          if((timeInicio >= bloqueos[i].fechaInicio && timeInicio <= bloqueos[i].fechaFin) ||
          (timeFinal >= bloqueos[i].fechaInicio && timeFinal <= bloqueos[i].fechaFin) || 
          (timeInicio <= bloqueos[i].fechaInicio && timeFinal >= bloqueos[i].fechaFin)){
            error = true;
          }
        }
      }
      if(error==true){
        if(modificado){
          alert("El máximo tiempo de uso fue modificado exitosamente pero hubo un choque con las fechas ingresadas");
        }
        else{
          alert("Hubo un choque con las fechas ingresadas");
        }
      }
      else{
        const data = {
          fechaInicio: timeInicio,
          fechaFin: timeFinal,
          cubiculo: numeroCubiculo
        };
        addDoc(coleccionTiempos, data);
        if(modificado){
          alert("El bloqueo y el cambio a maximo tiempo de uso fueron registrados con éxito");
        }
        else{
          alert("El bloqueo fue registrado con éxito");
        }
        navigate("/gestionTiempo", {});
      }
    }

  };

  const getCubiculoById = async (id) => {
    const cubiculo = await getDoc(doc(db, "cubiculos", id));

    if (cubiculo.exists()) {
      console.log(cubiculo.data());
      var buscar = cubiculo.data().tipo;
      setNumeroCubiculo(cubiculo.data().numeroCubiculo);
      setCapacidad(cubiculo.data().capacidad);
      setDisponible(cubiculo.data().disponible);
      setTipo(cubiculo.data().tipo);
    } else {
      console.log("El cubiculo no existe");
    }
  };

  useEffect(() => {
    getCubiculoById(id);
  }, []);

  const handleCancelar = () => {
    navigate("/gestionTiempo", {});
  };
  return (
    <Fragment>
      <div class="p-3 mb-2 bg-dark vh-100">
        <div className="jumbotron justify-content-center mx-auto my-2">
          <h1 className="fw-bold mb-5 text-center text-white">
            Editar Tiempo de uso
          </h1>
          <h2 className="fw-bold mb-5 text-center text-white">
            Cubículo #{numeroCubiculo}
          </h2>
        </div>
        <form onSubmit={update}>
          <div className="form-floating mx-5 my-2">
            <Form.Check
              inline
              type="radio"
              label="Disponible"
              name="disponible"
              value="disponible"
              checked={disponible === true}
              onClick={() => setDisponible(true)}
              style={{ color: "white" }}
            />
            <Form.Check
              inline
              type="radio"
              label="No disponible"
              name="disponible"
              value="noDisponible"
              checked={disponible === false}
              onClick={() => setDisponible(false)}
              style={{ color: "white" }}
            />
          </div>
          <div className="form-floating mx-5 my-2">
            <input
              type="number"
              className="form-control"
              id="maximoTiempo"
              placeholder="Maximo tiempo de uso"
              value={maximoTiempo}
              onChange={(event) => {
                setMaximoTiempo(event.target.value);
              }}
            />
            <label htmlFor="maximoTiempo">Máximo tiempo de uso</label>
            <button
              type="button"
              className="btn btn-outline-secondary btn-sm ms-2"
              onClick={() => setMaximoTiempo("")}
            >
              Limpiar
            </button>
          </div>
          <div className="form-floating mx-5 my-2">
            <input
              type="datetime-local"
              className="form-control"
              id="bloqueoInicio"
              value={bloqueoInicio}
              onChange={(event) => {
                setBloqueoInicio(event.target.value);
              }}
            />
            <label htmlFor="bloqueoInicio">Inicio del bloqueo</label>
          </div>
          <div className="form-floating mx-5 my-2">
            <input
              type="datetime-local"
              className="form-control"
              id="bloqueoFin"
              value={bloqueoFin}
              onChange={(event) => {
                setBloqueoFin(event.target.value);
              }}
            />
            <label htmlFor="bloqueoFin">Fin del bloqueo</label>
          </div>
          <div className="form-check mx-5 my-2">
            <input
              className="form-check-input"
              type="checkbox"
              value={notificar}
              onChange={(event) => setNotificar(event.target.checked)}
              id="notificarUsuarios"
            />
            <label
              className="form-check-label text-white"
              htmlFor="notificarUsuarios"
            >
              Notificar a usuarios
            </label>
          </div>
          <div className="row g-3 my-2 mb-5">
            <div className="col">
              <button 
                className="w-100 btn btn-lg btn-primary"
                onClick={update}>
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

export default EditarTiempoUso;
