import React from "react";
import "../css/index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { Button, /*Navbar,*/ DropdownButton, Dropdown } from "react-bootstrap";
const Header = ({ callback }) => {
  let games = [
    "pong",
    "pacman",
    "snake",
    "memory",
    "field",
    "P5",
    "pokemon",
    "pokemon2",
  ];
  return (
    <header style={{ display: "flex", justifyContent: "center" }}>
      <nav
        style={{ minWidth: 1200 }}
        id="nav"
        className="navbar navbar-expand-lg navbar-light bg-light"
      >
        <div className="container-fluid">
          <span className="navbar-brand">Console Game</span>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/">
                  <Button style={{ marginRight: 10 }} variant="primary">
                    Home
                  </Button>
                </Link>
              </li>

              <li className="nav-item dropdown">
                <DropdownButton
                  id="dropdown-basic-button"
                  title="Giochi"
                  variant="outline-primary"
                >
                  {games.map((game, index) => {
                    return (
                      <Dropdown.Item key={index}>
                        <Link
                          style={{ textDecoration: "none", color: "black" }}
                          to={"/" + game}
                        >
                          {game}
                        </Link>
                      </Dropdown.Item>
                    );
                  })}
                </DropdownButton>
              </li>
            </ul>
            <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;

/*
   <li className="nav-item">
                <a className="nav-link" href="#">
                  Link
                </a>
              </li>


                   <li className="nav-item">
                <a
                  className="nav-link disabled"
                  href="#"
                  tabindex="-1"
                  aria-disabled="true"
                >
                  Disabled
                </a>
              </li>
              
              */
