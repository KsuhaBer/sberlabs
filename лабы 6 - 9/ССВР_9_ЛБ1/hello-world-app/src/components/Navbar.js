import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav>
            <Link className="nav-link" to="/">Home</Link>
            <Link className="nav-link" to="/Main">Main</Link>
            <Link className="nav-link" to="/counter">Counter</Link>
        </nav>
    );
};

export default Navbar;
