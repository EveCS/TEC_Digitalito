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
  query
} from "firebase/firestore";
import { db } from "../firebase_config";

const checkboxStyle = {
  color: "#fff",
  padding: '20px',
  marginLeft: '-10px',
  alignContent: "center",
  justify: "center",
}

var divStyle = {
  color: 'white',
  padding: '10px',
  fontSize: '20px',
  alignContent: 'flex-end',
  // marginLeft: '40px'
  justify: "center"

};


const EditCubiculo = () => {
   
  let navigate = useNavigate();
  let [numeroCubiculo, setNumeroCubiculo] = useState("");
  let [capacidad, setCapacidad] = useState("");
  let [disponible, setDisponible] = useState("");
  let [tipo, setTipo] = useState("");

  const [options, setOptions] = useState({
    option1: false,
    option2: false,
    option3: false
});





  const checkIfCubiculoExists = async (numeroCubiculo,cubiculoId) => {
    console.log(cubiculoId)
    const querySnapshot = await getDocs(
      query(collection(db, "cubiculos"), where("numeroCubiculo", "==", numeroCubiculo),
      where("eliminado", "==", false))
    );
    return !querySnapshot.empty;
  };

  function getSelectedOptions(options) {
    let selectedOptions = "";
    for (const key in options) {
      if (options[key]) {
        selectedOptions += key.slice(-1) + ",";
      }
    }
    return selectedOptions.slice(0, -1);
}

  const { idAndNumCubiculo } = useParams();
  const [id, numCubiculo] = idAndNumCubiculo.split(',');


  const update = async (e) => {
    e.preventDefault();
    console.log(id);
    console.log(numCubiculo);
    const cubiculos = doc(db, "cubiculos", id);
    const cubiculoExists = await checkIfCubiculoExists(numeroCubiculo,id);

    if (!/^\d+$/.test(numeroCubiculo)) {
      alert("El número de cubículo solo debe contener números.");
      return navigate('/',{});
    }

    if ((0>numeroCubiculo)) {
      alert("El número de cubículo  debe ser positivo.");
      return navigate('/gestionCubiculos',{});
    }

    if ((0>capacidad)) {
      alert("El número de capacidad debe de ser positivos.");
      return navigate('/gestionCubiculos',{});
    }
    if (cubiculoExists && numeroCubiculo!=numCubiculo) {
      alert("El número de cubículo ya existe en la base de datos.");
      return navigate('/gestionCubiculos',{});
    }
    if (capacidad<=0 || capacidad>10){
        alert("El número de capacidad mínimo es 1 y máximo 10.");
        return navigate('/gestionCubiculos',{});
    }
    if(disponible !== 'Disponible' && disponible !== 'Mantenimiento' && disponible !== 'Ocupado'){
        alert("El estado solo puede ser Disponible,Mantenimiento u Ocupado")
        return navigate('/gestionCubiculos',{});
    }

    if(numeroCubiculo == null || ""){
    alert("El campo de número de cubículo no puede estar vacío")
    return navigate('/gestionCubiculos',{});
    }
    const selectedOptions = getSelectedOptions(options);
    if (selectedOptions === "") {
      alert("Por favor seleccione al menos una opción de servicios especiales.");
      return navigate('/gestionCubiculos',{});
    }

    else{
    const data = {
      numeroCubiculo: numeroCubiculo,
      capacidad: capacidad,
      disponible: disponible,
      tipo: getSelectedOptions(options)
    };
   
    await updateDoc(cubiculos, data);
    navigate("/gestionCubiculos");

  }
  };

  const getCubiculoById = async (id) => {
    const cubiculo = await getDoc(doc(db, "cubiculos", id));
  
    if (cubiculo.exists()) {
    console.log(cubiculo.data())
    var buscar = cubiculo.data().tipo;
      setNumeroCubiculo(cubiculo.data().numeroCubiculo);
      setCapacidad(cubiculo.data().capacidad);
      setDisponible(cubiculo.data().disponible);
      setTipo(cubiculo.data().tipo);

      if (buscar.includes("1")) {
        options.option1 = true;
      }
  
      if (buscar.includes("2")) {
        options.option2 = true;
      }
  
      if (buscar.includes("3")) {
        options.option3 = true;
      }

    } else {
      console.log("El cubiculo no existe");
    }
  };
 
  useEffect(() => {
    getCubiculoById(id);
  }, []);

  function handleCheckboxChange(event) {
    const { name, checked } = event.target;
    setOptions({ ...options, [name]: checked });
  }

  const handleCancelar = () => {
    navigate("/gestionCubiculos", {});
  };
  return (
    <Fragment>
      <div class="p-3 mb-2 bg-dark vh-100">
        <div className="jumbotron justify-content-center mx-auto my-2">
          <h1 className="fw-bold mb-5 text-center text-white">
            Editar Cubículo
          </h1>
        </div>
        <form onSubmit={update}>
          <div className="form-floating mx-5 my-2">
            <input
              type="text"
              className="form-control"
              placeholder="numeroCubiculo"
              id="numeroCubiculo"
              value={numeroCubiculo}
              onChange={(event) => {
                setNumeroCubiculo(event.target.value);
              }}
            />
            <label htmlFor="numeroCubiculo">Número del cubículo</label>
          </div>

          <div className="form-floating mx-5 my-2">
            <input
              type="int"
              className="form-control"
              id="capacidad"
              placeholder="Capacidad"
              value={capacidad}
              onChange={(event) => {
                setCapacidad(event.target.value);
              }}
            />
            <label htmlFor="Capacidad">Capacidad</label>
          </div>

          <div className="form-floating mx-5 my-2">
            <input
              type="text"
              className="form-control"
              id="disponible"
              placeholder="disponible"
              value={disponible}
              onChange={(event) => {
                setDisponible(event.target.value);
              }}
            />
            <label htmlFor="disponible">Estado</label>
          </div>
          <h1 style={divStyle}>
                                Servicios especiales: 
                        </h1>
            <Form>
                  <Form.Group style={{marginLeft: '760px'}} >
                                <Form.Check
                                inline
                                type="checkbox"
                                label="NVDA"
                                name="option1"
                                style={checkboxStyle}
                                checked={options.option1}
                                onChange={handleCheckboxChange}
                                />
                                <Form.Check
                                inline
                                type="checkbox"
                                label="Lanbda 1.4"
                                name="option2"
                                style={checkboxStyle}
                                checked={options.option2}
                                onChange={handleCheckboxChange}
                                />
                                <Form.Check
                                inline
                                type="checkbox"
                                label="JAWS"
                                name="option3"
                                style={checkboxStyle}
                                checked={options.option3}
                                onChange={handleCheckboxChange}
                                />
                            </Form.Group>
                            </Form>

          
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

export default EditCubiculo;