import React, { Fragment, useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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




const GestionReservaciones = () => {
  const [reservaciones, setReservaciones] = useState([]);
  const reservacionesCollectionRef = collection(db, "reservaciones");
  let navigate = useNavigate();
  const [searchCubiculo, setSearchCubiculo] = useState("");

  const data = {
    searchCubiculo: searchCubiculo,
  };

  const getReservaciones = async () => {
    const data = await getDocs(reservacionesCollectionRef);
    const reservaciones = data.docs
      .map((doc) => ({ ...doc.data(), id: doc.id }))
      .filter(
        (reservacion) =>
          reservacion.activa &&
          reservacion.cubiculo.toString().includes(searchCubiculo)
      );
    setReservaciones(reservaciones);
  };

  useEffect(() => {
    getReservaciones();
  }, [searchCubiculo]);

  const deleteReservacion = async (id) => {
    const confirmed = window.confirm(
      "¿Estás seguro que quieres eliminar esta reservación?"
    );
    if (confirmed) {
      const reservacionesDoc = doc(db, "reservaciones", id);
      await updateDoc(reservacionesDoc, { activa: false });
      getReservaciones();
    }
  };

  const [searchInput, setSearchInput] = useState("");

  const handleChange = async (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  
    if (e.target.value === "") {
      const data = await getDocs(reservacionesCollectionRef);
      const reservaciones = data.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }))
        .filter((reservacion) => reservacion.activa);
      setReservaciones(reservaciones);
    } else {
      const data = await getDocs(reservacionesCollectionRef);
      const reservaciones = data.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }))
        .filter(
          (reservacion) =>
            reservacion.activa &&
            reservacion.cubiculo.toString().includes(e.target.value)
        );
      setReservaciones(reservaciones);
    }
  };

  useEffect(() => {
    console.log(reservaciones);
  }, [reservaciones]);

  return (
    <Fragment>
      <div className="p-3 mb-2 bg-dark vh-100">
        <div className="jumbotron justify-content-center mx-auto my-2">
          <h1 className="fw-bold mb-5 text-center text-white">
            Gestión de Reservaciones
          </h1>
        </div>
        <input
          type="int"
          placeholder="número de cubículo"
          onChange={handleChange}
          value={searchInput}
        />

        <div className="container">
          <div className="row">
            <div className="col">
              <table className=" table table-dark table-hover">
                <thead>
                  <tr>
                    <th>Número de cubículo</th>
                    <th>Hora Inicio</th>
                    <th>Hora Final</th>
                    <th>Fecha</th>
                    <th>Carné estudiante</th>
                    <th>Nombre estudiante</th>
                  </tr>
                </thead>

                <tbody>
                  {reservaciones.map((reservaciones) => (
                    <tr key={reservaciones.id}>
                      <td>{reservaciones.cubiculo}</td>
                      <td>{reservaciones.hora.toDate().toLocaleTimeString([], { hour: 'numeric', minute: 'numeric', hour12: true })}</td>
                      <td>{reservaciones.horaFinal.toDate().toLocaleTimeString([], { hour: 'numeric', minute: 'numeric', hour12: true })}</td>
                      <td>{reservaciones.fecha}</td>
                      <td>{reservaciones.carnee}</td>
                      <td>{reservaciones.estudiante}</td>

                      <td className="text-left">
                        <Link to={`/editReservacion/${reservaciones.id}`}>
                          <i
                            className="fa-solid fa-pen-to-square fa-2x"
                            style={{ color: "white" }}
                          ></i>
                        </Link>
                      </td>
                      <td>
                        <button
                          onClick={() => {
                            deleteReservacion(reservaciones.id);
                          }}
                          className="btn btn-danger"
                        >
                          Borrar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>

                
              </table>

            </div>
            <button
              onClick={() => {navigate('/adminMenu',{})}}
              className="btn btn-primary mb-3 btn-lg"
              type="button"
              >
              Atras
            </button>
          </div>
          
        </div>

      </div>


</Fragment>
  );
};
export default GestionReservaciones;