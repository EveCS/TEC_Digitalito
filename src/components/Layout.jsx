// Layout.js
import React from 'react';
import Menu from './Menu/Menu';

const Layout = ({ children }) => {
    return (
        <div>
            <Menu />
            {children}
        </div>
    );
};

export default Layout;