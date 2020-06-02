import React from "react";
import { Link } from "react-router-dom";

const Header = () => (
  <nav className="navbar navbar-dark bg-primary">
    <Link to="/" className="navbar-brand">
      <h3>ArPress</h3>
    </Link>
    <ul className="navbar-nav">
      <li className="nav-item">
        <Link to="/admin/categories" className="nav-link">
          Categorias
        </Link>
      </li>
    </ul>
  </nav>
);

export default Header;
