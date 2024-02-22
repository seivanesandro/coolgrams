import React from 'react'
//import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';

//styles
import styled, { keyframes } from 'styled-components';
//import './Search.css';

//hooks
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useResetComponentMessage } from '../../hooks/useResetComponentMessage';
import { useQuery } from '../../hooks/useQuery';

//redux
import { searchPhotos, like } from '../../slices/photoSlice';

//components
import LikeContainer from '../../components/likeContainer/LikeContainer';
import PhotoItem from '../../components/photoItem/PhotoItem';
import Loading from '../../components/load/Loading';
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
    gap: 5em;
`;

const ContainerPhoto = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    max-width: 70%;

    @media only screen and (${devices.mobileG}) {
        max-width: 100% !important;
    }
`;

const ContainerLoading = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const SpanNotFound = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.3em;
    color: #0095b6;
`;

const Search = props => {
    const query = useQuery();
    const search = query.get('q');

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
        dispatch(searchPhotos(search));
    }, [dispatch, search]);

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
      <EditProfileAnimation>
          <h2>
              Resultados da Pesquisa: {search}
          </h2>
          {photos &&
              photos.map(photo => (
                  <ContainerPhoto
                      className="container_photo"
                      key={photo._id}
                  >
                      <PhotoItem photo={photo} />
                      <LikeContainer
                          photo={photo}
                          user={user}
                          handleLike={handleLike}
                          marginmobile="0"
                          marginlaptop="0"
                      />
                      <Link
                          className="btn"
                          to={`/photos/${photo._id}`}
                      >
                          Ver mais
                      </Link>
                  </ContainerPhoto>
              ))}
          {photos && photos.length === 0 && (
              <SpanNotFound>
                  <span>Sem resultados, tente novamente!</span>{' '}
              </SpanNotFound>
          )}
      </EditProfileAnimation>
  );
}

Search.propTypes = {}

export default Search