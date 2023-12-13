import React from 'react'
//import PropTypes from 'prop-types'

//styles
import styled, { keyframes } from 'styled-components';
import './EditProfile.css';

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

const EditProfile = props => {
  return (
      <EditProfileAnimation className="edit_profile">

      </EditProfileAnimation>
  );
}

EditProfile.propTypes = {}

export default EditProfile