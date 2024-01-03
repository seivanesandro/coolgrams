import React from 'react'
//import PropTypes from 'prop-types'

//styles
import styled, { keyframes } from 'styled-components';
import './Home.css';
import { devices } from '../../utils/constantes';

//components
import LikeContainer from '../../components/likeContainer/LikeContainer';
import PhotoItem from '../../components/photoItem/PhotoItem';
import { Link } from 'react-router-dom';
import Loading from '../../components/load/Loading';

// hooks
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useResetComponentMessage } from "../../hooks/useResetComponentMessage";

// Redux
import { getPhotos, like } from "../../slices/photoSlice";


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
const EditHomeAnimation = styled.div`
    animation: ${Show} 2s linear;
`;

const ContainerLoading = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const OptionPost = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    padding: 2rem;

    @media only screen and (${devices.mobileP}) {
    }
    @media only screen and (${devices.mobileM}) {
    }
    @media only screen and (${devices.mobileG}) {
    }
    @media only screen and (${devices.tablet}) {
        padding: 0.5rem !important;
    }
    @media only screen and (${devices.portatil}) {
        padding: 1rem;
    }
`;


const Home = () => {
    const dispatch = useDispatch();

    const resetMessage =
        useResetComponentMessage(dispatch);

    const { user } = useSelector(
        state => state.auth
    );
    const { photos, loading } = useSelector(
        state => state.photo
    );

    // Load all photos
    useEffect(() => {
        dispatch(getPhotos());
    }, [dispatch]);

    const handleLike = (photo = null) => {
        dispatch(like(photo._id));

        resetMessage();
    };


      if (loading) {
          return (
              <ContainerLoading>
                  <Loading
                      size="4"
                      speedborder="1"
                  />
              </ContainerLoading>
          );
      }

    return (
        <EditHomeAnimation id="home">
            {photos &&
                photos.map(photo => (
                    <div key={photo._id}>
                        <PhotoItem
                            photo={photo}
                        />
                        <OptionPost className="option_post">
                            <LikeContainer
                                photo={photo}
                                user={user}
                                handleLike={
                                    handleLike
                                }
                            />
                            <Link
                                className="btn_comment"
                                to={`/photos/${photo._id}`}
                            >
                                Comentar
                            </Link>
                        </OptionPost>
                    </div>
                ))}
            {photos && photos.length === 0 && (
                <h2 className="no-photos">
                    Ainda não há fotos publicadas,{' '}
                    <Link
                        to={`/user/${user._id}`}
                    >
                        clique aqui
                    </Link>{' '}
                    para começar.
                </h2>
            )}
        </EditHomeAnimation>
    );
}

Home.propTypes = {}

export default Home