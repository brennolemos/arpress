import React from "react";
import { Link } from "react-router-dom";

const Header = (props) => (
  <nav className="navbar navbar-expand-sm navbar-dark bg-primary">
    <Link to="/" className="navbar-brand mr-auto">
      <h3>ArPress</h3>
    </Link>
    {props.logged ? (
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/admin/articles" className="nav-link">
            Artigos
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/categories" className="nav-link">
            Categorias
          </Link>
        </li>
      </ul>
    ) : (
      <ul className="navbar-nav">
        {props.categories &&
          props.categories.map((category) => (
            <li key={category.id} className="nav-item">
              <Link to={`/category/${category.slug}`} className="nav-link">
                {category.title}
              </Link>
            </li>
          ))}
      </ul>
    )}
  </nav>
);

export default Header;
