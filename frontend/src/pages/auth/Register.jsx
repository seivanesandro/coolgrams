import React from 'react'
//import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';

//styles
import styled, { keyframes } from 'styled-components';
import './Auth.css';

//copmponentes
import Message from '../../components/message/Message';
//import Loading from '../../components/load/Loading';

//hook
import { useState, useEffect } from 'react';
  import {
      useSelector,
      useDispatch
  } from 'react-redux';
// Redux
import { register, reset } from "../../slices/authSlice";
import Loading from '../../components/load/Loading';

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
const RegisterAnimation = styled.div`
    animation: ${Show} 2s linear;
`;

const ContainerLoading = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Register = () => {
    const [name, setname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] =
        useState('');

    const dispatch = useDispatch();

    const { loading, error } = useSelector(
        state => state.auth
    );

    const handleSubmit = e => {
        e.preventDefault();

        //construçao do usuario
        const user = {
            name,
            email,
            password,
            confirmPassword
        };

        //FIXME: console log for test
        console.log(user);

        dispatch(register(user));
    };

    // Clean all auth states
    useEffect(() => {
        dispatch(reset());
    }, [dispatch]);

    return (
        <RegisterAnimation className="register">
            <div className="register_header">
                <h2 className="title">
                    Registar Conta
                </h2>
                <p className="subtitle">
                    Preenche o teu registo aqui!
                </p>
            </div>
            {error && (
                <Message
                    msg={error}
                    type="error"
                />
            )}
            <form
                className="register_form"
                onSubmit={handleSubmit}
            >
                <input
                    type="text"
                    className="nome"
                    placeholder="Nome"
                    value={name}
                    onChange={e =>
                        setname(e.target.value)
                    }
                    maxLength={10}
                />
                <input
                    type="email"
                    className="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={e =>
                        setEmail(e.target.value)
                    }
                    maxLength={30}
                />
                <input
                    type="password"
                    className="password"
                    placeholder="Password"
                    value={password}
                    onChange={e =>
                        setPassword(
                            e.target.value
                        )
                    }
                    maxLength={15}
                />
                <input
                    type="password"
                    className="confirma_password"
                    placeholder="Confirme Password"
                    value={confirmPassword}
                    onChange={e =>
                        setConfirmPassword(
                            e.target.value
                        )
                    }
                    maxLength={15}
                />
                {loading && (
                    <ContainerLoading>
                        <Loading
                            size="4"
                            speedborder="1"
                        />
                    </ContainerLoading>
                )}
                {!loading && (
                    <input
                        type="submit"
                        value="Registar"
                    />
                )}
            </form>
            <div className="link_for_login">
                <p className="link_for_login">
                    Já tem conta?
                    <Link
                        to="/login"
                        className="link"
                    >
                        Clique aqui.
                    </Link>
                </p>
            </div>
        </RegisterAnimation>
    );
}

Register.propTypes = {}

export default Register