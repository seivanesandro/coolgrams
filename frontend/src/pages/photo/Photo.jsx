import React from 'react';
import { uploads } from '../../utils/config';

//style
import './Photo.css';
import styled, { keyframes } from 'styled-components'

//components
import Message from '../../components/message/Message';
import Loading from '../../components/load/Loading';
import { Link } from 'react-router-dom';

//hooks
import { useEffect, useState} from 'react';
import {
    useSelector,
    useDispatch
} from 'react-redux';
import { useParams } from 'react-router-dom';
import { useResetComponentMessage } from '../../hooks/useResetComponentMessage';

//redux


const Show = keyframes`
    0%{
        opacity:0;
        top: -115px;
    }
    50%{
        opacity:0.5;
    }

    100%{
        opacity:1;
        top: 0;
    }
`;
const EditProfileAnimation = styled.div`
    animation: ${Show} 2s linear;
`;

export const Photo = () => {
  return (
      <EditProfileAnimation>
          Photo
      </EditProfileAnimation>
  );
};

export default Photo;