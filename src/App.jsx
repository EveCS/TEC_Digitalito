import React, { Fragment, useRef, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { ClientMenu } from "./components/Client/ClientMenu";
import { AdminMenu } from "./components/Admin/AdminMenu";
import { MiCuenta } from "./components/Client/MiCuenta";
import { MisCursos } from "./components/Client/MisCursos";
import { MatricularCurso } from "./components/Client/MatricularCurso";
import GestionCursos from "./components/Courses/Courses";
import GestionEvaluaciones from "./components/Courses/Evaluations";
import AdminCurso from "./components/Courses/AdminCurso";
import { EstudiantesEnCurso } from "./components/Admin/EstudiantesPorCurso";
import { AddFriends } from "./components/Client/AddFriends";
export function App() {
  return (
    <Router>
      <div className="App">MiCuenta
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/clientMenu" element={<ClientMenu />} />
          <Route 
            exact
            path="/misCursos"
            element={<MisCursos />}
          />
          <Route exact path="/addFriends" element={<AddFriends />} />
          <Route exact path="/adminMenu" element={<AdminMenu />} />
          <Route exact path="/gestionCursos" element={<GestionCursos />} />
            <Route exact path="/adminCurso/:id" element={<AdminCurso />} />
            <Route exact path="/adminEvaluacion/:id" element={<GestionEvaluaciones />} />
            <Route exact path="/estudiantesEnCurso" element={<EstudiantesEnCurso />} />
          <Route exact path="/miCuenta" element={<MiCuenta />} />

          <Route exact path="/matricularcurso" element={<MatricularCurso />} />

          
        </Routes>
      </div>
    </Router>
  );
}

//export default App;
