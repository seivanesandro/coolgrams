import React from 'react'
//import PropTypes from 'prop-types'
import { uploads } from '../../utils/config';

//styles
import styled, { keyframes } from 'styled-components';
import './EditProfile.css';

// Hooks
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// Redux
import { profile, updateProfile, resetMessage } from "../../slices/userSlice";

// Components
import Message from "../../components/message/Message";
import Loading from '../../components/load/Loading';


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

const EditProfile = (props) => {
    const dispatch = useDispatch();

    const { user, message, error, loading } = useSelector((state) => state.user);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [profileImage, setProfileImage] = useState('');
    const [bio, setBio] = useState('');
    const [previewImage, setPreviewImage] = useState('');

    // Load user data
    useEffect(() => {
        dispatch(profile());
    }, [dispatch]);

    //test user
    //console.log(user)

    // fill user form
    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setBio(user.bio);
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Get user data from states
    const userData = {
      name,
    };

    if (profileImage) {
      userData.profileImage = profileImage;
    }

    if (bio) {
      userData.bio = bio;
    }

    if (password) {
      userData.password = password;
    }

    // build form data
    const formData = new FormData();

    const userFormData = Object.keys(userData).forEach((key) =>
      formData.append(key, userData[key])
    );

    formData.append("user", userFormData);

    await dispatch(updateProfile(formData));

    setTimeout(() => {
      dispatch(resetMessage());
    }, 5000);

    };

    const handleFile = e => {
        // image preview
        const image = e.target.files[0];

        setPreviewImage(image);

        // change image state
        setProfileImage(image);
    };

    return (
        <EditProfileAnimation className="edit_profile">
            {error && (
                <Message
                    msg={error}
                    type="error"
                />
            )}
            {message && (
                <Message
                    msg={message}
                    type="success"
                />
            )}

            <div className="edit_profile_header">
                <h2 className="title">
                    Bem-vindo {user.name}
                </h2>

                {/* preview image */}
                {(user.profileImage ||
                    previewImage) && (
                    <img
                        className="profile_image"
                        src={
                            previewImage
                                ? URL.createObjectURL(
                                      previewImage
                                  )
                                : `${uploads}/users/${user.profileImage}`
                        }
                        alt={user.name}
                    />
                )}

                <p className="subtitle">
                    Faça gestão do seu perfil
                    aqui!
                </p>
            </div>
            <form
                className="edit_profile_form"
                onSubmit={handleSubmit}
            >
                <label>
                    <span>Nome</span>
                    <input
                        type="text"
                        placeholder="Nome"
                        minLength={3}
                        maxLength={10}
                        onChange={e => {
                            setName(
                                e.target.value
                            );
                        }}
                        value={name || ''}
                    />
                </label>
                <label>
                    <span>Email</span>
                    <input
                        type="email"
                        placeholder="E-mail"
                        disabled
                        value={email || ''}
                    />
                </label>
                <hr />
                <label>
                    <span>
                        Imagem de Perfil{' '}
                        <small>
                            ( jpg | png )
                        </small>
                    </span>
                    <input
                        type="file"
                        onChange={handleFile}
                        accept="image/png, image/jpeg"
                    />
                </label>
                <label>
                    <span>Bio</span>
                    <input
                        type="text"
                        placeholder="Descrição do perfil"
                        onChange={e => {
                            setBio(
                                e.target.value
                            );
                        }}
                        value={bio || ''}
                    />
                </label>
                <hr />
                <label>
                    <span>Alterar Password</span>
                    <input
                        type="password"
                        placeholder="Digite sua nova senha..."
                        minLength={6}
                        maxLength={15}
                        onChange={e => {
                            setPassword(
                                e.target.value
                            );
                        }}
                        value={password || ''}
                    />
                </label>
                {!loading && (
                    <input
                        type="submit"
                        value="Atualizar"
                    />
                )}
                {loading && (
                    <ContainerLoading>
                        <Loading
                            size="4"
                            speedborder="1"
                        />
                    </ContainerLoading>
                )}
            </form>
        </EditProfileAnimation>
    );
}

EditProfile.propTypes = {}

export default EditProfile