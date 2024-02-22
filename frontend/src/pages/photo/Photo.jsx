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
import LikeContainer from '../../components/likeContainer/LikeContainer';
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
`;

const ContainerLoading = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const CommentsContainer = styled.div`
    animation: ${Show} 2s linear;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    align-items: flex-start;
    text-align: center;
    margin-top: 2rem;
`;

const FormStyled = styled.form`
    animation: ${Show} 2s linear;
    display: flex;
    flex-direction: column;
    gap: 0 !important;
    margin-bottom: 3rem;
`;

const CommentStyle = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;
    padding: 2rem 0 2rem 0;
`;

const AuthorCommentStyled = styled.p`
    color: #6b6b6b;
    padding: 1rem;
    border-radius: 16px;
    font-style: italic;
    font-size: 25px;

    @media only screen and (${devices.mobileP}) {
        padding: 0.1rem;
    }
`;
const AutorImgStyle = styled.img`
    width: 90px !important;
    height: 90px !important;
    border-radius: 50% !important;
    border: 2px solid #fff;
    color: #6b6b6b;
`;
const AutorNameStyle = styled.p`
    cursor: pointer;
    color: #6b6b6b;
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

    //comments state
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
      <EditProfileAnimation className="photo">
          {error && (
              <Message msg={error} type="error" />
          )}
          {message && (
              <Message
                  msg={message}
                  type="success"
              />
          )}
          <PhotoItem photo={photo} />
          <LikeContainer
              photo={photo}
              user={user}
              marginmobile='0'
              marginlaptop='0'
              handleLike={handleLike}
          />

          <CommentsContainer className="container-comments">
              {!photo.commments && (
                      <>
                          <h3>
                              Comentários (
                              {photo.comments &&
                                  photo.comments
                                      .length}
                              )
                          </h3>
                          <FormStyled
                              onSubmit={
                                  handleComment
                              }
                          >
                              <input
                                  type="text"
                                  placeholder="Insira um comentário"
                                  onChange={e =>
                                      setCommentText(
                                          e.target
                                              .value
                                      )
                                  }
                                  value={
                                      commentText ||
                                      ''
                                  }
                              />
                              <input
                                  type="submit"
                                  value="Inserir comentário"
                              />
                          </FormStyled>
                          {photo.comments &&
                              photo.comments
                                  .length ===
                                  0 && (
                                  <span>
                                      Não contém
                                      comentários
                                      ainda!
                                  </span>
                              )}
                          {photo.comments &&
                              photo.comments.map(
                                  comment => (
                                      <CommentStyle
                                          className="comment"
                                          key={
                                              comment.comment
                                          }
                                      >
                                          <div className="author">
                                              {comment.userImage && (
                                                  <AutorImgStyle
                                                      src={`${uploads}/users/${comment.userImage}`}
                                                      alt={
                                                          comment.userName
                                                      }
                                                  />
                                              )}
                                              <Link
                                                  className="author_styled"
                                                  to={`/users/${comment.userId}`}
                                              >
                                                  <AutorNameStyle>
                                                      {
                                                          comment.userName
                                                      }
                                                  </AutorNameStyle>
                                              </Link>
                                          </div>
                                          <AuthorCommentStyled>
                                              {
                                                  comment.comment
                                              }
                                          </AuthorCommentStyled>
                                      </CommentStyle>
                                  )
                              )}
                      </>
                  )}
          </CommentsContainer>
      </EditProfileAnimation>
  );
};

export default Photo;