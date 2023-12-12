import React from 'react'
//import PropTypes from 'prop-types'

// styles 
//import styled from 'styled-components';
import logo from '../../assets/img/logo1bg.png';
import './NavBar.css';

//components
import { NavLink, Link } from 'react-router-dom';
import {
    BsSearch,
    BsHouseDoorFill,
    BsFillPersonFill,
    BsFillCameraFill
} from 'react-icons/bs';

//hooks
import { useState  } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
    const { auth } = useAuth();
    //user
    const { user } = useSelector((state) => state.auth);

  return (
      <>
          <nav className="nav fixed-top">
              <div className="container-brand">
                  <Link to="/">
                      <img
                          src={logo}
                          alt="responsive-img"
                          style={{ width: '75%' }}
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
                      {auth ? (
                          <>
                              <li>
                                  <NavLink to="/">
                                      <BsHouseDoorFill />
                                  </NavLink>
                              </li>
                              {user && (
                                  <li>
                                      <NavLink
                                          to={`/users/${user._id}`}
                                      >
                                          <BsFillCameraFill />
                                      </NavLink>
                                  </li>
                              )}
                              <li>
                                  <NavLink to="/profile">
                                      <BsFillPersonFill />
                                  </NavLink>
                              </li>
                              <li>
                                  <span
                                  >
                                      Logout
                                  </span>
                              </li>
                          </>
                      ) : (
                          <>
                              <li>
                                  <NavLink to="/login">
                                      Login
                                  </NavLink>
                              </li>
                              <li>
                                  <NavLink to="/register">
                                      Registar
                                  </NavLink>
                              </li>
                          </>
                      )}
                  </ul>
              </div>
          </nav>
      </>
  );
}

export default Navbar