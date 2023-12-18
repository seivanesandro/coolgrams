import React from 'react'
//import PropTypes from 'prop-types'

//styles
//import styled, { keyframes } from 'styled-components';
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



const Profile = () => {

    const { id } = useParams();

    const dispatch = useDispatch();

    const { user, loading } = useSelector(
        state => state.user
    );
    const { user: userAuth } = useSelector(
        state => state.auth
    );

    //new form and edit form refs
    const newPhotoForm = useRef();
    const editPhotoForm = useRef();

    // Load user data
    useEffect(() => {

        dispatch(getUserDetails(id));
    }, [dispatch, id]);

    const submitHandle = (e) => {
        e.preventDefault();

        
    }

    if(loading){
        return <Loading />;
    }

  return (
      <div className="profile">
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
          {id === userAuth._id && (
              <>
                  <div
                      className="new_photo"
                      ref={newPhotoForm}
                  >
                      <h3>Novo Post</h3>
                       <form className="form_profile" onSubmit={submitHandle} > 
                          <label>
                              <span>Titulo</span>
                              <input
                                  type="text"
                                  placeholder="escreva o titulo"
                              />
                          </label>
                          <label>
                              <span>
                                  Insira uma
                                  imagem (jpg |
                                  png)
                              </span>
                              <input type="file" />
                          </label>
                          <input
                              type="submit"
                              value="Post"
                          />
                          <hr />
                      </form>
                  </div>
              </>
          )}
      </div>
  );
}


export default Profile