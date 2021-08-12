import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import "./Navbar.scss";

class Navbar extends Component {
  renderList = (links) => {
    return links.map((link, index) => {
      return (
        <li key={index} className="link me-4">
          <NavLink to={link.to} exact={link.exact}>
            {link.text}
          </NavLink>
        </li>
      );
    });
  };

  render() {
    let links = [
      { text: "Фильмы", to: "/", exact: true },
      { text: "Топ рейтинг ", to: "/top", exact: false },
    ];

    if (this.props.isAuthenticated) {
      links.push({ text: "Избранное", to: "/favorite", exact: false });
      links.push({ text: "Выйти", to: "/logout", exact: false });
    } else {
      links.push({ text: "Войти", to: "/login", exact: false });
    }

    return (
      <header>
        <nav className="navbar navbar-light bg-dark">
          <div className="container-fluid ">
            <Link to="/" className="navbar-brand logo">
              Film search SPA
            </Link>
            <ul className="nav-item d-flex flex-wrap justify-content-center align-items-center mt-3">
              {this.renderList(links)}
            </ul>
          </div>
        </nav>
      </header>
    );
  }
}

export default Navbar;
