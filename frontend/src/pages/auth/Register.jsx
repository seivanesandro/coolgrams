import React from 'react'
//import PropTypes from 'prop-types'

//styles
//import styled from 'styled-components';
import './Auth.css';

//copmponentes
import { Link } from 'react-router-dom';

//hook
import { useState, useEffect } from 'react';
  import {
      useSelector,
      useDispatch
  } from 'react-redux';
// Redux
import { register, reset } from "../../slices/authSlice";


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
        <div className="register">
            <div className="register_header">
                <h2 className="title">
                    Registar Conta
                </h2>
                <p className="subtitle">
                    Preenche o teu registo aqui!
                </p>
            </div>
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
                <input
                    type="submit"
                    className="registar"
                />
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
        </div>
    );
}

Register.propTypes = {}

export default Register