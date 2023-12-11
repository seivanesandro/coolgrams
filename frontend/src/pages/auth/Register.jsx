import React from 'react'
//import PropTypes from 'prop-types'

//styles
//import styled from 'styled-components';
import './Auth.css';

//copmponentes
import { Link } from 'react-router-dom';

//hook
//TODO:import { useState, useEffect } from 'react';




const Register = () => {

  const handleSubmit = (e) => {
      e.preventDefault();

  }
  return (
      <div className="register">
          <div className="register_header">
              <h2 className="title">
                  Registar Conta
              </h2>
              <p className="subtitle">
                  Preenche o teu registo aqui!
              </p>
          </div>
          <form
              className="register_form"
              onSubmit={handleSubmit}
          >
              <input
                  type="text"
                  className="nome"
                  placeholder="Nome"
                  maxLength={10}
              />
              <input
                  type="email"
                  className="email"
                  placeholder="E-mail"
                  maxLength={30}
              />
              <input
                  type="password"
                  className="password"
                  placeholder="Password"
                  maxLength={15}
              />
              <input
                  type="password"
                  className="confirma_password"
                  placeholder="Confirme Password"
                  maxLength={15}
              />
              <input
                  type="submit"
                  className="registar"
              />
          </form>
          <div className="link_for_login">
              <p className="link_for_login">
                  Já tem conta?
                  <Link to="/login" className='link'>
                      Clique aqui.
                  </Link>
              </p>
          </div>
      </div>
  );
}

Register.propTypes = {}

export default Register