import React from 'react'
//import PropTypes from 'prop-types';

// styles 
import styled, { keyframes } from 'styled-components';
import './Message.css';
import { devices } from '../../utils/constantes';

const Show2 = keyframes`
    0%{
        opacity:0;
    }
    50%{
        opacity:0.5;
    }

    100%{
        opacity:1;
    }
`;

const BoxMessage = styled.div`
    border-radius: 5px;
    padding: 1rem 2rem;
    width: 15em;
    /*     display: flex;
    justify-content: center;
    align-items: center; */
    animation: ${Show2} 1s linear;
    position: relative;

    @media only screen and (${devices.mobileP}) {
        padding: 1rem 2rem;
        width: 10em;
    }
    @media only screen and (${devices.mobileM}) {
        padding: 1rem 2rem;
        width: 15em;
    }
    @media only screen and (${devices.mobileG}) {
        padding: 1rem 2rem;
        width: 15em;
    }
`;




const Message = ({msg, type}) => {
  return (
      <BoxMessage className={`${type}`}>
          <span>{msg}</span>
      </BoxMessage>
  );
}

Message.propTypes = {}

export default Message