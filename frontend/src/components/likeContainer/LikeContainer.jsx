import React from 'react'
//import PropTypes from 'prop-types'
import styled, { keyframes } from 'styled-components';

import {
    BsHeart,
    BsHeartFill
} from 'react-icons/bs';
import { devices } from '../../utils/constantes';

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

const ContainerLike = styled.div`
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: wrap;
    margin: 0 30rem 0 0 !important;
    padding: 3rem 0 3rem 0;
    color: #fafafa;
    cursor: pointer;

    border-bottom: 1px solid #414345;

    animation: ${Show} 2s linear;

    @media only screen and (${devices.mobileP}) {
        margin: 0 2rem 0 0 !important;
    }
    @media only screen and (${devices.portatilL}) {
        margin: 0 6rem 0 0;
    }
`;

const LikeContainer = ({photo, user, handleLike}) => {
  return (
      <ContainerLike className="like">
          {photo.likes && user && (
              <>
                  {photo.likes.includes(
                      user._id
                  ) ? (
                      <BsHeartFill />
                  ) : (
                      <BsHeart
                          onClick={() =>
                              handleLike(photo)
                          }
                      />
                  )}
                  <p>
                      {photo.likes.length}{' '}
                      Likes(s)
                  </p>
              </>
          )}
      </ContainerLike>
  );
}

LikeContainer.propTypes = {}

export default LikeContainer