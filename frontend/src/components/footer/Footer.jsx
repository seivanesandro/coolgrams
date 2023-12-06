import React from 'react'
//import PropTypes from 'prop-types'

// styles 
//import styled from 'styled-components';
//import styles from './NavBar.module.css';
import logo3 from '../../assets/img/logo3.png';


const Footer = () => {
  return (
      <>
          <img src={logo3} alt='logo2'/>
          <p className="footerAuthor">
              CoolGram &copy; 2023
          </p>
      </>
  );
}

Footer.propTypes = {}

export default Footer