import React from 'react'
//import PropTypes from 'prop-types'

//styles
import styled, { keyframes } from 'styled-components';
import './Profile.css';

import { uploads } from '../../utils/config';

// COmponents
import Message from '../../components/message/Message';
import Loading from '../../components/load/Loading';
import { Link } from 'react-router-dom';
import { BsFillEyeFill, BsPencilFill, BsXLg } from 'react-icons/bs';

//Hooks
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

//redux
import { getUserDetails } from '../../slices/userSlice';

import {
    getUserPhotos,
    publishPhoto,
    resetMessage,
    deletePhoto,
    updatePhoto
} from '../../slices/photoSlice';

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


const Profile = () => {
    const { id } = useParams();

    const dispatch = useDispatch();

    const { user, loading } = useSelector(
        state => state.user
    );
    const { user: userAuth } = useSelector(
        state => state.auth
    );
    const {
        photos,
        loading: loadingPhoto,
        error: errorPhoto,
        message: messagePhoto
    } = useSelector(state => state.photo);

    //states para adicação
    const [title, setTitle] = useState();
    const [image, setImage] = useState();

    //states para edição
    const [editId, setEditId] = useState();
    const [editImage, setEditImage] = useState();
    const [editTitle, setEditTitle] = useState();

    // New form and edit form refs
    const newPhotoForm = useRef();
    const editPhotoForm = useRef();

    // Load user data
    useEffect(() => {
        dispatch(getUserDetails(id));
        dispatch(getUserPhotos(id));
    }, [dispatch, id]);

    // Reset component message
    function resetComponentMessage() {
        setTimeout(() => {
            dispatch(resetMessage());
        }, 5000);
    }

    // Publish a new photo
    const submitHandle = e => {
        e.preventDefault();

        const photoData = {
            title,
            image
        };

        // build form data
        const formData = new FormData();

        const photoFormData = Object.keys(
            photoData
        ).forEach(key =>
            formData.append(key, photoData[key])
        );

        formData.append('photo', photoFormData);

        dispatch(publishPhoto(formData));

        setTitle('');

        resetComponentMessage();
    };

    // change image state
    const handleFile = e => {
        const image = e.target.files[0];

        setImage(image);
    };

    // Exclude an image
    const handleDelete = id => {
        dispatch(deletePhoto(id));

        resetComponentMessage();
    };

    // Show or hide forms
    function hideOrShowForms() {
        newPhotoForm.current.classList.toggle(
            'hide'
        );
        editPhotoForm.current.classList.toggle(
            'hide'
        );
    }

    // Show edit form
    const handleEdit = photo => {
        if (
            editPhotoForm.current.classList.contains(
                'hide'
            )
        ) {
            hideOrShowForms();
        }

        setEditId(photo._id);
        setEditImage(photo.image);
        setEditTitle(photo.title);
    };

    // Cancel editing
    const handleCancelEdit = () => {
        hideOrShowForms();
    };

    // Update photo title
    const handleUpdate = e => {
        e.preventDefault();

        const photoData = {
            title: editTitle,
            id: editId
        };

        dispatch(updatePhoto(photoData));

        resetComponentMessage();
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
        <EditProfileAnimation className="profile">
            {errorPhoto && (
                <Message
                    msg={errorPhoto}
                    type="error"
                />
            )}
            {messagePhoto && (
                <Message
                    msg={messagePhoto}
                    type="success"
                />
            )}
            <div className="profile_header">
                {user.profileImage && (
                    <img
                        src={`${uploads}/users/${user.profileImage}`}
                        alt={user.name}
                    />
                )}
                <div className="profile_description">
                    <h2>{user.name}</h2>
                    <p>{user.bio}</p>
                </div>
            </div>
            <hr />
            {/* publicar fotos */}
            {id === userAuth._id && (
                <>
                    <div
                        className="new_photo"
                        ref={newPhotoForm}
                    >
                        <h3>Novo Post</h3>
                        <form
                            className="profile_form"
                            onSubmit={
                                submitHandle
                            }
                        >
                            <label>
                                <span>
                                    Titulo
                                </span>
                                <input
                                    type="text"
                                    placeholder="escreva o titulo"
                                    onChange={e =>
                                        setTitle(
                                            e
                                                .target
                                                .value
                                        )
                                    }
                                    value={
                                        title ||
                                        ''
                                    }
                                />
                            </label>
                            <label>
                                <span>
                                    Insira uma
                                    imagem (jpg |
                                    png)
                                </span>
                                <input
                                    type="file"
                                    onChange={
                                        handleFile
                                    }
                                />
                            </label>
                            {!loadingPhoto && (
                                <input
                                    type="submit"
                                    value="Post"
                                />
                            )}
                            {loadingPhoto && (
                                <ContainerLoading>
                                    <Loading
                                        size="3"
                                        speedborder="1"
                                    />
                                </ContainerLoading>
                            )}
                        </form>
                    </div>

                    <div
                        className="edit_photo hide"
                        ref={editPhotoForm}
                    >
                        <h3>Atualizar Post</h3>
                        {editImage && (
                            <img
                                src={`${uploads}/photos/${editImage}`}
                                alt={editTitle}
                            />
                        )}

                        <form
                            onSubmit={
                                handleUpdate
                            }
                            className="edit_form"
                        >
                            <label>
                                <span>
                                    Atualizar
                                    Titulo
                                </span>
                                <input
                                    type="text"
                                    onChange={e =>
                                        setEditTitle(
                                            e
                                                .target
                                                .value
                                        )
                                    }
                                    value={
                                        editTitle ||
                                        ''
                                    }
                                />
                            </label>

                            <input
                                type="submit"
                                value="Atualizar"
                            />
                            <button
                                className="cancel-btn"
                                onClick={
                                    handleCancelEdit
                                }
                            >
                                Cancelar
                            </button>
                        </form>
                    </div>
                </>
            )}

            <hr />
            {/* visualizar fotos */}
            <div className="user_photos">
                <h3>As suas publicações</h3>
                <div className="photos_container">
                    {photos &&
                        photos.map(photo => (
                            <div
                                className="single_photo"
                                key={photo._id}
                            >
                                {photo.image && (
                                    <img
                                        src={`${uploads}/photos/${photo.image}`}
                                        alt={
                                            photo.title
                                        }
                                    />
                                )}

                                {id ===
                                userAuth._id ? (
                                    <div className="actions">
                                        <Link
                                            to={`/photos/${photo._id}`}
                                        >
                                            <BsFillEyeFill />
                                        </Link>
                                        <BsPencilFill
                                            onClick={() =>
                                                handleEdit(
                                                    photo
                                                )
                                            }
                                        />
                                        <BsXLg
                                            onClick={() =>
                                                handleDelete(
                                                    photo._id
                                                )
                                            }
                                        />
                                    </div>
                                ) : (
                                    <Link
                                        className="btn"
                                        to={`/photos/${photo._id}`}
                                    >
                                        ver foto
                                    </Link>
                                )}
                                <hr />
                            </div>
                        ))}
                    {photos.length === 0 && (
                        <span>
                            Sem fotos publicadas.
                        </span>
                    )}
                </div>
            </div>
        </EditProfileAnimation>
    );
}


export default Profile