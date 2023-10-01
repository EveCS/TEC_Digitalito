// Menu.js
import React from 'react';
import './Menu.css';

const Menu = () => {
    return (
        <nav className="menu">
            <div className="menu-logo">
                <img src="/path/to/logo.png" alt="TEC Digitalito" />
            </div>
            <ul className="menu-links">
                <li><a href="/">Login</a></li>
                <li><a href="/gestionCursos">Gestion Cursos</a></li>
                <li><a href="/estudiante">Estudiante</a></li>
            </ul>
        </nav>
    );
};

export default Menu;
