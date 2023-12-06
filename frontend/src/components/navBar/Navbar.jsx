import React from 'react'
//import PropTypes from 'prop-types'

// styles 
//import styled from 'styled-components';
import logo from '../../assets/img/logo1.png';
import './NavBar.css';

//components
import { NavLink, Link } from 'react-router-dom';
import {
    BsSearch,
    BsHouseDoorFill,
    BsFillPersonFill,
    BsFillCameraFill
} from 'react-icons/bs';

const Navbar = () => {
  return (
      <>
          <nav className="nav fixed-top">
              <div className="container-brand">
                  <Link to="/">
                      <img
                          src={logo}
                          alt="responsive-img"
                          style={{ 'width': '80%' }}
                      />
                  </Link>
              </div>
              <form id="search-form">
                  <BsSearch color="black" />
                  <input
                      type="text"
                      placeholder="Pesquisar"
                  />
              </form>
              <div className="container-itens">
                  <ul id="nav-links">
                      <li>
                          <NavLink to="/">
                              <BsHouseDoorFill />
                          </NavLink>
                      </li>
                      <li>
                          <NavLink to="/login">
                              Login
                          </NavLink>
                      </li>
                      <li>
                          <NavLink to="/register">
                              Cadastrar
                          </NavLink>
                      </li>
                  </ul>
              </div>
          </nav>
      </>
  );
}

export default Navbar