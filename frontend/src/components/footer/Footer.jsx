import React from 'react'
//import PropTypes from 'prop-types'

// styles 
//import styled from 'styled-components';
import './Footer.css';
import logo3 from '../../assets/img/logo3.png';


const Footer = () => {
  return (
      <>
          <img src={logo3} alt='logo2'/>
          <p className="footerAuthor">
             copyrights&copy;CoolGram 2023
          </p>
      </>
  );
}

Footer.propTypes = {}

export default Footer