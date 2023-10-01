import React, { Fragment, useRef, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { ClientMenu } from "./components/Client/ClientMenu";
import { AdminMenu } from "./components/Admin/AdminMenu";
import GestionEstudiantes from "./components/Admin/GestionEstudiantes";
import EditUsuario from "./components/Admin/EditUsuario";
import EditCubiculo from "./components/Admin/EditCubiculo";
import GestionCubiculos from "./components/Admin/GestionCubiculos";
import CrearCubiculos from "./components/Admin/CrearCubiculos";
import GestionReservaciones from "./components/Admin/GestionReservaciones";
import EditReservacion from "./components/Admin/EditReservacion";
import { MiCuenta } from "./components/Client/MiCuenta";
import VerHistorial from "./components/Admin/VerHistorial";
import GestionTiempo from "./components/Admin/GestionTiempo";
import EditarTiempoUso from "./components/Admin/EditarTiempoUso";
import { MisCursos } from "./components/Client/MisCursos";
import { MatricularCurso } from "./components/Client/MatricularCurso";
export function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/clientMenu" element={<ClientMenu />} />
          <Route
            exact
            path="/misCursos"
            element={<MisCursos />}
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
          <Route exact path="/gestionTiempo" element={<GestionTiempo />} />
          <Route exact path="/editarTiempoUso/:id" element={<EditarTiempoUso />} />
          <Route exact path="/matricularcurso" element={<MatricularCurso />} />

          <Route
            exact
            path="/gestionCubiculos"
            element={<GestionCubiculos />}
          />
          <Route exact path="/crearCubiculos" element={<CrearCubiculos />} />
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
    </Router>
  );
}

//export default App;
