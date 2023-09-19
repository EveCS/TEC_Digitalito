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
var divStyle = {
  color: "white",
  padding: "10px",
  fontSize: "12px",
  alignContent: "flex-end",
};
const GestionTiempo = () => {
  const [cubiculos, setCubiculos] = useState([]);
  const cubiculosCollectionRef = collection(db, "cubiculos");
  let navigate = useNavigate();

  const getCubiculos = async () => {
    const data = await getDocs(cubiculosCollectionRef);
    const cubiculos = data.docs
      .map((doc) => ({ ...doc.data(), id: doc.id }))
      .filter((usuario) => !usuario.eliminado);
    setCubiculos(cubiculos);
  };
  useEffect(() => {
    getCubiculos();
  }, []);

  const deleteCubiculo = async (id) => {
    const confirmed = window.confirm(
      "¿Estás seguro que quieres eliminar este cubículo?"
    );
    if (confirmed) {
      const cubiculosDoc = doc(db, "cubiculos", id);
      await updateDoc(cubiculosDoc, { eliminado: true });
      getCubiculos();
    }
  };

  useEffect(() => {
    console.log(cubiculos);
  }, [cubiculos]);
  return (
    <Fragment>
      <div class="p-3 mb-2 bg-dark vh-100">
        <div className="jumbotron justify-content-center mx-auto my-2">
          <h1 className="fw-bold mb-5 text-center text-white">
            Gestión de Tiempo de uso
          </h1>
        </div>
        <div className="container">
          <div className="row">
            <div className="col">
              <table className=" table table-dark table-hover">
                <thead>
                  <tr>
                    <th>Número de cubículo</th>
                    <th>Disponibilidad</th>
                    <th>Editar</th>
                  </tr>
                </thead>
                <tbody>
                  {cubiculos.map((cubiculos) => (
                    <tr key={cubiculos.id}>
                      <td>{cubiculos.numeroCubiculo}</td>
                      <td>{cubiculos.disponible}</td>
                      <td className="text-left">
                        <Link to={`/editarTiempoUso/${cubiculos.id}`}>
                          <i
                            className="fa-solid fa-pen-to-square fa-2x"
                            style={{ color: "white" }}
                          ></i>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <button
                  onClick={() => {
                    navigate("/adminMenu", {});
                  }}
                  className="btn btn-primary mb-3 ml-2 btn-lg"
                  type="button"
                >
                  Atras
                </button>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default GestionTiempo;
