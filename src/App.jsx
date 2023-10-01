import React, { Fragment, useRef, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { ClientMenu } from "./components/Client/ClientMenu";
import { ClientReservations } from "./components/Client/ClientReservations";
import { AdminMenu } from "./components/Admin/AdminMenu";
import GestionEstudiantes from "./components/Admin/GestionEstudiantes";
import EditUsuario from "./components/Admin/EditUsuario";
import EditCubiculo from "./components/Admin/EditCubiculo";
import GestionCubiculos from "./components/Admin/GestionCubiculos";
import CrearCubiculos from "./components/Admin/CrearCubiculos";
import GestionReservaciones from "./components/Admin/GestionReservaciones";
import GestionCursos from "./components/Courses/Courses";
import GestionEvaluaciones from "./components/Courses/Evaluations";
import AdminCurso from "./components/Courses/AdminCurso";
import EditReservacion from "./components/Admin/EditReservacion";
import { MiCuenta } from "./components/Client/MiCuenta";
import { Reservas } from "./components/Client/Reservas";
import VerHistorial from "./components/Admin/VerHistorial";
import GestionTiempo from "./components/Admin/GestionTiempo";
import EditarTiempoUso from "./components/Admin/EditarTiempoUso";
import Layout from "./components/Layout";
export function App() {
  return (
    <Router>
      <Layout>
        <div className="App">
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/clientMenu" element={<ClientMenu />} />
            <Route
              exact
              path="/clientReservations"
              element={<ClientReservations />}
            />
            <Route exact path="/adminMenu" element={<AdminMenu />} />
            <Route
              exact
              path="/gestionEstudiantes"
              element={<GestionEstudiantes />}
            />
            <Route exact path="/edit/:id" element={<EditUsuario />} />
            <Route exact path="/editCubiculo/:idAndNumCubiculo" element={<EditCubiculo />} />
            <Route exact path="/miCuenta" element={<MiCuenta />} />
            <Route exact path="/reservarCubiculo" element={<Reservas />} />
            <Route exact path="/gestionTiempo" element={<GestionTiempo />} />
            <Route exact path="/editarTiempoUso/:id" element={<EditarTiempoUso />} />


            <Route
              exact
              path="/gestionCubiculos"
              element={<GestionCubiculos />}
            />
            <Route exact path="/crearCubiculos" element={<CrearCubiculos />} />
            <Route exact path="/gestionCursos" element={<GestionCursos />} />
            <Route exact path="/adminCurso/:id" element={<AdminCurso />} />
            <Route exact path="/adminEvaluacion/:id" element={<GestionEvaluaciones />} />
            <Route
              exact
              path="/gestionReservaciones"
              element={<GestionReservaciones />}
            />
            <Route
              exact
              path="/editReservacion/:id"
              element={<EditReservacion />}
            />
            <Route
              exact
              path="/verHistorial/:carnee"
              element={<VerHistorial />}
            />
          </Routes>
        </div>
      </Layout>
    </Router>
  );
}

//export default App;
