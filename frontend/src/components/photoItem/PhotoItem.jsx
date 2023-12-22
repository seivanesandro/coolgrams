import React from 'react'
//import PropTypes from 'prop-types'

import { uploads } from '../../utils/config';

import { Link } from 'react-router-dom';


//styles 
import './PhotoItem.css';
import styled, { keyframes } from 'styled-components';
import { devices } from '../../utils/constantes';

const Show = keyframes`
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

const EditProfileAnimation = styled.div`
    animation: ${Show} 2s linear;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3rem;

    background: #414345;
    padding: 0 0 4rem 0;

    box-shadow: 0 0 0.4rem #6b6b6b;
    border-top-right-radius: 16px;
    border-top-left-radius: 16px;

    text-align: left;
    width: 100%;
    height: 100%;


    @media only screen and (${devices.mobileG}) {
        width: 300% !important;
    }
    @media only screen and (${devices.tablet}) {
        width: 200%;
    }
`;

const ImgCard = styled.img`
    max-width: 100% !important;
    max-height: 100% !important;
`;

const BodyCard = styled.div`
    display: flex;
    flex-direction: column;
    align-content: flex-start;
    flex-wrap: wrap;
    margin: 0 18rem 0 0 !important;

    @media only screen and (${devices.mobileP}) {
        margin: 0 2rem 0 0 !important;
    }
    @media only screen and (${devices.portatilL}) {
        margin: 0 6rem 0 0;
    }
`;


const PhotoItem = ({ photo }) => {
  return (
      <EditProfileAnimation>
          {photo.image && (
              <ImgCard
                  className="img_card"
                  src={`${uploads}/photos/${photo.image}`}
                  alt={photo.title}
              />
          )}
          <BodyCard className="card_body">
              <small>
                  t<strong>itulo:</strong>
              </small>
              <p className="title_card">
                  {' '}
                  {photo.title}
              </p>
              <small>
                  <strong>Autor:</strong>{' '}
              </small>

              <p>
                  <Link
                      to={`/users/${photo.userId}`}
                  >
                      {photo.userName}
                  </Link>
              </p>
          </BodyCard>
      </EditProfileAnimation>
  );
}

PhotoItem.propTypes = {}

export default PhotoItem