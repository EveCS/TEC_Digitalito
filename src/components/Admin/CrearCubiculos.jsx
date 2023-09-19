import React, { Fragment, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { addDoc, collection, getDocs,where,query,doc,updateDoc } from "firebase/firestore";
import { db } from "../firebase_config";
import { Form } from 'react-bootstrap';

const checkIfCubiculoExists = async (numeroCubiculo) => {
    const querySnapshot = await getDocs(
      query(collection(db, "cubiculos"), where("numeroCubiculo", "==", numeroCubiculo))
    );
    return !querySnapshot.empty;
  };

  const checkIfEliminado = async (numeroCubiculo) => {
    const querySnapshot = await getDocs(
      query(collection(db, "cubiculos"), where("numeroCubiculo", "==", numeroCubiculo), where("eliminado", "==", true))
    );
    return !querySnapshot.empty;
  };

  var divStyle = {
    color: 'white',
    padding: '10px',
    fontSize: '20px',
    alignContent: 'flex-end',
    marginLeft: '40px'

};

var divStyle2 = {
    color: "white",
    padding: "10px",
    fontSize: "12px",
    alignContent: "flex-end",
  };

const checkboxStyle = {
    color: "#fff",
    padding: '20px',
    marginLeft: '-10px',
    alignContent: "center"
}

export function CrearCubiculos(){
    
    

    let navigate = useNavigate();
    const [newNumeroCubiculo, setNumeroCubiculo] = useState("");
    const [newCapacidad, setCapacidad] = useState("");
    const [newTipo, setTipo] = useState("");
    const [newEstado, setEstado] = useState("");
    
    const [options, setOptions] = useState({
        option1: false,
        option2: false,
        option3: false
    });
    
    const [cubiculos, setCubiculos] = useState([]);
    const cubiculosCollectionRef = collection(db, "cubiculos");

    function getSelectedOptions(options) {
        let selectedOptions = "";
        for (const key in options) {
          if (options[key]) {
            selectedOptions += key.slice(-1) + ",";
          }
        }
        return selectedOptions.slice(0, -1);
    }

    const crearCubiculo = async () =>{
        const cubiculoExists = await checkIfCubiculoExists(newNumeroCubiculo);
        const cubiculoEliminado = await checkIfEliminado(newNumeroCubiculo);

            if (!/^\d+$/.test(newNumeroCubiculo)) {
                alert("El número de cubículo solo debe contener números.");
                return navigate('/gestionCubiculos',{});
            }
            if (cubiculoExists && !cubiculoEliminado) {
                alert("El número de cubículo ya existe en la base de datos.");
                return navigate('/gestionCubiculos',{});
            }
            if (newCapacidad<=0 || newCapacidad>10){
                alert("El número de capacidad mínimo es 1 y máximo 10.");
                return navigate('/gestionCubiculos',{});
            }
            if(newEstado !== 'Disponible' && newEstado !== 'Mantenimiento' && newEstado !== 'Ocupado'){
                alert("El estado solo puede ser Disponible,Mantenimiento u Ocupado")
                return navigate('/gestionCubiculos',{});
            }

            if(newNumeroCubiculo == null || ""){
             alert("El campo de número de cubículo no puede estar vacío")
            return navigate('/gestionCubiculos',{});
            }
            const selectedOptions = getSelectedOptions(options);
            if (selectedOptions === "") {
              alert("Por favor seleccione al menos una opción de servicios especiales.");
              return navigate('/gestionCubiculos',{});
            }
            else {
                alert("El cubículo fue creado exitosamente")
        const data = {
            numeroCubiculo: newNumeroCubiculo,
            capacidad: newCapacidad,
            tipo: getSelectedOptions(options),
            disponible: newEstado, 
            eliminado: false,
            maximoTiempoUso: "0"
            
        };
        if(cubiculoEliminado){
            const cubiculosDocs = await getDocs(cubiculosCollectionRef);
            const dataCubiculos = cubiculosDocs.docs.map((doc) => ({ ...doc.data(), id: doc.id}))
            console.log(dataCubiculos);
            let idCubiculo = 0;
            for(let i in dataCubiculos){
                if(dataCubiculos[i].numeroCubiculo == newNumeroCubiculo){
                    idCubiculo = dataCubiculos[i].id;
                }
            }
            const cubiculoDOC = doc(db, "cubiculos", idCubiculo);
            await updateDoc(cubiculoDOC,data);
            navigate('/gestionCubiculos',{});
        }
        else{
            await addDoc(cubiculosCollectionRef, data);
            navigate('/gestionCubiculos',{});
        }
        }
    }

    useEffect(() => {
        const getCubiculos = async () => {
            const data = await getDocs(cubiculosCollectionRef);
            setCubiculos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
        };
        getCubiculos();
    }, []);

    function CheckboxExample() {
        const [options, setOptions] = useState({
          option1: false,
          option2: false,
          option3: false,
        });
    }
    function handleCheckboxChange(event) {
          const { name, checked } = event.target;
          setOptions({ ...options, [name]: checked });
        }
    const handleCancelar = () => {
        navigate('/crearCubiculo',{});
    }
    return (
        <Fragment>
            <div class="p-3 mb-2 bg-dark vh-100">
                <div class="jumbotron justify-content-center w-25 mx-auto my-2">
                    
                    <h1 class="fw-bold mb-5 text-center text-white">Registro de cubículo</h1>

                        <div className="form-floating mx-5 my-2">
                            <input type="int" className="form-control" id="numeroCubiculo" placeholder="Número de cubículo" 
                            onChange={(event) =>{
                                setNumeroCubiculo(event.target.value);
                            }}/>
                            <label for="Número de cubículo">Número de cubículo</label>
                        </div>

                        <div className="form-floating mx-5 my-2">
                            <input type="int" class="form-control" id="capacidad" placeholder="capacidad"
                            onChange={(event) =>{
                                setCapacidad(event.target.value);
                            }}/>
                            <label for="capacidad">Capacidad</label>
                        
                            </div>

                            <div className="form-floating mx-5 my-2">
                            <input type="text" class="form-control" id="estado" placeholder="estado"
                            onChange={(event) =>{
                                setEstado(event.target.value);
                            }}/>
                            <label for="estado">Estado</label>
                            </div>
                            
                        <h1 style={divStyle}>
                                Servicios especiales: 
                        </h1>
                            </div>

                            <Form>
                            <Form.Group style={{marginLeft: '760px'}} >
                                <Form.Check
                                inline
                                type="checkbox"
                                label="Option 1"
                                name="option1"
                                style={checkboxStyle}
                                checked={options.option1}
                                onChange={handleCheckboxChange}
                                />
                                <Form.Check
                                inline
                                type="checkbox"
                                label="Option 2"
                                name="option2"
                                style={checkboxStyle}
                                checked={options.option2}
                                onChange={handleCheckboxChange}
                                />
                                <Form.Check
                                inline
                                type="checkbox"
                                label="Option 3"
                                name="option3"
                                style={checkboxStyle}
                                checked={options.option3}
                                onChange={handleCheckboxChange}
                                />
                            </Form.Group>
                            </Form>

                            

                        <div className="row g-3 my-2 mb-5">
                            <div className="col">
                                <button onClick={crearCubiculo} className="w-100 btn btn-lg btn-primary">Confirmar</button>
                            </div>
                            <div className="col">
                                <button onClick={() => {navigate('/gestionCubiculos',{})}} className="w-100 btn btn-lg btn-secondary">Cancelar</button>
                                
                            </div>
                        </div>
                        <div>
                            <h1 style={divStyle2}>Leyenda</h1>
                            <h1 style={divStyle2}>
                            Servicio especial 1: NVDA: programa parlante que lee el texto.
                            </h1>
                            <h1 style={divStyle2}>
                            Servicio especial 2: Lanbda 1.4: software para la edición de
                            textos matemáticos basada en la utilización de ordenadores PC
                            con sistema operativo Microsoft Windows, compatible con el
                            revisor de pantalla.
                            </h1>
                            <h1 style={divStyle2}>
                            Servicio especial 3: JAWS: Ofrece una interoperabilidad entre
                            usuarios ciegos y videntes, mediante la utilización de líneas
                            braille, sintetizadores de voz, pantalla e impresoras, tanto
                            en tinta como braille.
                            </h1>
                        </div>
                </div>
            

        </Fragment>
    );
    
};
export default CrearCubiculos;