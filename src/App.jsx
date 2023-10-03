import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { ClientMenu } from "./components/Client/ClientMenu";
import { AdminMenu } from "./components/Admin/AdminMenu";
import { MiCuenta } from "./components/Client/MiCuenta";
import { MisCursos } from "./components/Client/MisCursos";
import { MatricularCurso } from "./components/Client/MatricularCurso";
import GestionCursos from "./components/Courses/Gestion/GestionCursos";
import AdminCurso from "./components/Courses/Admin/AdminCurso";
import AdminSeccion from "./components/Courses/Admin/AdminSeccion";
import { EstudiantesEnCurso } from "./components/Admin/EstudiantesPorCurso";
import { AddFriends } from "./components/Client/AddFriends";
import AdminEvaluacion from "./components/Courses/Admin/AdminEvaluacion";
import EvaluationFormJhonn from "./components/Admin/EvaluationJhonnForm";
import AdminTema from "./components/Courses/Admin/AdminTema";
import AdminSubTema from "./components/Courses/Admin/AdminSubTema";
import HacerEvaluacion from "./components/Client/HacerEvaluacion";
import VerNotas from "./components/Client/VerMisNotas";
import { BuscarCursos } from "./components/Client/BuscarCursos";
import { Chats } from "./components/Admin/Chats";
export function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/buscarCurso" element={<BuscarCursos />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/clientMenu" element={<ClientMenu />} />
          <Route exact path="/misCursos" element={<MisCursos />} />
          <Route exact path="/addFriends" element={<AddFriends />} />
          <Route exact path="/verNotas" element={<VerNotas />} />
          <Route exact path="/hacerEvaluacion" element={<HacerEvaluacion />} />
          <Route exact path="/adminMenu" element={<AdminMenu />} />
          <Route exact path="/chats" element={<Chats />} />
          <Route exact path="/gestionCursos" element={<GestionCursos />} />
          <Route exact path="/adminCurso/:id" element={<AdminCurso />} />
          <Route exact path="/adminEvaluacion/:id" element={<AdminEvaluacion />} />
          <Route exact path="/adminSeccion/:id" element={<AdminSeccion />} />
          <Route exact path="/adminTema/:id" element={<AdminTema />} />
          <Route exact path="/adminSubTema/:id" element={<AdminSubTema />} />

          <Route exact path="/estudiantesEnCurso" element={<EstudiantesEnCurso />} />
          <Route exact path="/miCuenta" element={<MiCuenta />} />
          <Route exact path="/matricularcurso" element={<MatricularCurso />} />
          <Route exact path="/EvaluationFormJhonn" element={<EvaluationFormJhonn />} />
        </Routes>
      </div>
    </Router>

  );
}