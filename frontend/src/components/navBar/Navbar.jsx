import React, { useState } from 'react'
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
//import { useState  } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// Redux
import { logout, reset } from "../../slices/authSlice";

const Navbar = () => {
    const { auth } = useAuth();
    //user
    const { user } = useSelector((state) => state.auth);

     const navigate = useNavigate();

     const dispatch = useDispatch();

      const [query, setQuery] = useState('');

    const handleLogout = () => {
        dispatch(logout());
        dispatch(reset());

        navigate('/login');
    };

    const handleSearch = e => {
        e.preventDefault();

        if (query) {
            return navigate(`/search?q=${query}`);
        }
    };

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
              <form
                  id="search-form"
                  onSubmit={handleSearch}
              >
                  <BsSearch color="black" />
                  <input
                      type="text"
                      placeholder="Pesquisar"
                      onChange={( e )=> setQuery(e.target.value)}
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
                                      onClick={
                                          handleLogout
                                      }
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