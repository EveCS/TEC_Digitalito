// Menu.js
import React from 'react';
import './Menu.css';

const Menu = () => {
    return (
        <nav className="menu">
            <div className="menu-logo">

                <ul className="menu-links">
                    <img src="logo192.png" alt="TEC Digitalito" />
                    <li><a href="/">Tec Digitalito</a></li>
                    <li><a href="/gestionCursos">Gestion Cursos</a></li>
                    <li><a href="/register">Registrarse</a></li>
                </ul>
            </div>

        </nav>
    );
};

export default Menu;
