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
    gap: 1.2rem;

    background: transparent;
    padding: 0 0 0 0;

    border-top-right-radius: 16px;
    border-top-left-radius: 16px;
    border: 1px solid #414345;

    text-align: left;
    width: 100%;
    height: 100%;

    //FIXME: teste resolutions to responsive image
    @media only screen and (${devices.mobileG}) {
        width: 100% !important;
    }
    @media only screen and (${devices.tablet}) {
        width: 100%;
    }
`;

const ImgCard = styled.img`
    max-width: 100% !important;
    max-height: 100% !important;
    border-top-right-radius: 16px !important;
    border-top-left-radius: 16px !important;
`;

const BodyCard = styled.div`
    display: flex;
    flex-direction: column;
    align-content: flex-start;
    flex-wrap: wrap;
    margin: 0 10rem 0 0 !important;
    padding: 3rem 0 3rem 0;
    gap: 0.3rem;

    @media only screen and (${devices.mobileP}) {
        text-align: center;
    }

    @media only screen and (${devices.portatilL}) {
        margin: 0 !important;
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

                <p className="title_card">
                    {' '}
                    {photo.title}
                </p>
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