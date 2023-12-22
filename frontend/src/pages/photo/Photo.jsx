import React from 'react';
import { uploads } from '../../utils/config';
import { Link } from 'react-router-dom';

//style
import './Photo.css';
import styled, { keyframes } from 'styled-components'

//components
import Message from '../../components/message/Message';
import Loading from '../../components/load/Loading';
import PhotoItem from '../../components/photoItem/PhotoItem';


//hooks
import { useEffect, useState} from 'react';
import {
    useSelector,
    useDispatch
} from 'react-redux';
import { useParams } from 'react-router-dom';
import { useResetComponentMessage } from '../../hooks/useResetComponentMessage';

//redux
import {
    getPhoto,
    like,
    comment
} from '../../slices/photoSlice';



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

const ContainerLoading = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Photo = () => {
    const { id } = useParams();

    const dispatch = useDispatch();

    const resetMessage =
        useResetComponentMessage(dispatch);

    // catch user data
    const { user } = useSelector(
        state => state.auth
    );
    const { photo, loading, error, message } =
        useSelector(state => state.photo);

    //coments state
    const [commentText, setCommentText] =
        useState();

    // Load photo data
    useEffect(() => {
        dispatch(getPhoto(id));
    }, [dispatch, id]);

    // Like a photo
    const handleLike = () => {
        dispatch(like(photo._id));

        resetMessage();
    };

    // Insert a comment
    const handleComment = e => {
        e.preventDefault();

        const photoData = {
            comment: commentText,
            id: photo._id
        };

        dispatch(comment(photoData));

        setCommentText('');

        resetMessage();
    };

    // loading
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
      <EditProfileAnimation className='photo'>
          <PhotoItem photo={photo} />
      </EditProfileAnimation>
  );
};

export default Photo;