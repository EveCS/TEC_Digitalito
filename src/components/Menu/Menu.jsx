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
                <li><a href="/">Home</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/contact">Contact</a></li>
            </ul>
        </nav>
    );
};

export default Menu;
