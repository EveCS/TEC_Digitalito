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
} from "firebase/firestore";
import { db } from "../firebase_config";
import emailjs from 'emailjs-com';

const EditUsuario = () => {
  let navigate = useNavigate();
  const usuariosCollectionRef = collection(db, "usuarios");
  let [nombre, setNombre] = useState("");
  let [apellido, setApellido] = useState("");
  let [segundoApellido, setSegundoApellido] = useState("");
  let [carnee, setCarnee] = useState("");
  let [cedula, setCedula] = useState("");
  let [fechaNacimiento, setFechaNacimiento] = useState("");
  let [correo, setCorreo] = useState("");
  let [contraseña, setContraseña] = useState("");
  let [estado, setEstado] = useState("");

  const { id } = useParams();
  const update = async (e) => {
    e.preventDefault();
    const email = "estudiantec.cr";
    const emailRegex = new RegExp('^[A-Za-z0-9._%+-]+@' + email + '$');
    const datos = await getDocs(usuariosCollectionRef);
    const usuarios = datos.docs.map((doc) => ({ ...doc.data(), id: doc.id}));
    const usuario = doc(db, "usuarios", id);
    const data = {
      nombre: nombre,
      apellido: apellido,
      segundoApellido: segundoApellido,
      carnee: carnee,
      cedula: cedula,
      fechaNacimiento: fechaNacimiento,
      correo: correo,
      contraseña: contraseña,
      estado: estado,
    };
    if(!emailRegex.test(correo)){
      alert('Solo se permiten correos con el dominio estudiantec.cr');
    }
    else{

      let error = false;
      for(let i in usuarios){
        if((usuarios[i].correo==correo || usuarios[i].cedula==cedula || usuarios[i].carnee==carnee) && usuarios[i].id!=id){
          error=true;
        }
      }
      if(error){
        alert("Alguno de los siguientes datos coincide con los de otro usuario:\n-Correo Institucional\n-Carnee Estudiantil\n-Cedula");
        navigate("/gestionEstudiantes");

      }
      else{
        await updateDoc(usuario, data);
        navigate("/gestionEstudiantes");
      }
    }
    
  };

  const getUsuarioById = async (id) => {
    const usuario = await getDoc(doc(db, "usuarios", id));
    if (usuario.exists()) {
      //console.log(usuario.data())
      setNombre(usuario.data().nombre);
      setApellido(usuario.data().apellido);
      setSegundoApellido(usuario.data().segundoApellido);
      setCarnee(usuario.data().carnee);
      setCedula(usuario.data().cedula);
      setFechaNacimiento(usuario.data().fechaNacimiento);
      setCorreo(usuario.data().correo);
      setContraseña(usuario.data().contraseña);
      setEstado(usuario.data().estado);
    } else {
      console.log("El usuario no existe");
    }
  };
  const handleEstadoChange = (event) => {
    setEstado(event.target.value);
  };
  useEffect(() => {
    getUsuarioById(id);
  }, []);

  const handleCancelar = () => {
    navigate("/gestionEstudiantes", {});
  };
  return (
    <Fragment>
      <div class="p-3 mb-2 bg-dark vh-100">
        <div className="jumbotron justify-content-center mx-auto my-2">
          <h1 className="fw-bold mb-5 text-center text-white">
            Editar Usuario
          </h1>
        </div>
        <form onSubmit={update}>
          <div className="form-floating mx-5 my-2">
            <input
              type="text"
              className="form-control"
              placeholder="Nombre"
              id="nombre"
              value={nombre}
              onChange={(event) => {
                setNombre(event.target.value);
              }}
            />
            <label htmlFor="nombre">Nombre</label>
          </div>

          <div className="form-floating mx-5 my-2">
            <input
              type="text"
              className="form-control"
              id="apellido"
              placeholder="Apellido"
              value={apellido}
              onChange={(event) => {
                setApellido(event.target.value);
              }}
            />
            <label htmlFor="apellido">Apellido</label>
          </div>

          <div className="form-floating mx-5 my-2">
            <input
              type="text"
              className="form-control"
              id="segundoApellido"
              placeholder="SegundoApellido"
              value={segundoApellido}
              onChange={(event) => {
                setSegundoApellido(event.target.value);
              }}
            />
            <label htmlFor="segundoApellido">Segundo Apellido</label>
          </div>

          <div className="form-floating mx-5 my-2">
            <input
              type="text"
              className="form-control"
              id="carnee"
              placeholder="Carnee"
              value={carnee}
              onChange={(event) => {
                setCarnee(event.target.value);
              }}
            />
            <label htmlFor="carnee">Carné</label>
          </div>

          <div className="form-floating mx-5 my-2">
            <input
              type="text"
              className="form-control"
              id="cedula"
              placeholder="Cedula"
              value={cedula}
              onChange={(event) => {
                setCedula(event.target.value);
              }}
            />
            <label htmlFor="cedula">Cedula</label>
          </div>

          <div className="form-floating mx-5 my-2">
            <input
              type="date"
              className="form-control"
              id="fechaNacimiento"
              placeholder="FechaNacimiento"
              value={fechaNacimiento}
              onChange={(event) => {
                setFechaNacimiento(event.target.value);
              }}
            />
            <label htmlFor="fechaNacimiento">Fecha de Nacimiento</label>
          </div>

          <div className="form-floating mx-5 my-2">
            <input
              type="email"
              className="form-control"
              id="correo"
              placeholder="Correo"
              value={correo}
              onChange={(event) => {
                setCorreo(event.target.value);
              }}
            />
            <label htmlFor="correo">Correo Estudiantil</label>
          </div>
          <div className="form-floating mx-5 my-2">
            <Form.Check
              style={{ color: "white" }}
              inline
              type="radio"
              label="Activo"
              name="estado"
              value="Activo"
              checked={estado === "Activo"}
              onChange={handleEstadoChange}
            />
            <Form.Check
              inline
              type="radio"
              label="Suspendido"
              name="estado"
              value="Suspendido"
              style={{ color: "white" }}
              checked={estado === "Suspendido"}
              onChange={handleEstadoChange}
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

export default EditUsuario;
