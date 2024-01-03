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
import { login, reset } from "../../slices/authSlice";
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
const LoginAnimation = styled.div`
    animation: ${Show} 2s linear;
`;

const ContainerLoading = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    const { loading, error } = useSelector(
        (state) => state.auth
    );

    const handlesubmit = e => {
        e.preventDefault();

        //construçao do usuario
        const user = {
            email,
            password
        };

        //FIXME: console log for test
        console.log(user);

        dispatch(login(user));
    };

    // Clean all auth states
    useEffect(() => {
        dispatch(reset());
    }, [dispatch]);

    return (
        <LoginAnimation className="login">
            <div className="login_header">
                <h2 className="title">
                    CoolGrams
                </h2>
                <p className="subtitle">
                    Faz o teu Login aqui!
                </p>
            </div>
            {error && (
                <Message
                    msg={error}
                    type="error"
                />
            )}
            <form
                className="login_form"
                onSubmit={handlesubmit}
            >
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
                        value="Login"
                    />
                )}
            </form>
            <div className="link_for_register">
                <p className="link_for_register">
                    Ainda não tem conta?
                    <Link
                        to="/register"
                        className="link"
                    >
                        Clique aqui.
                    </Link>
                </p>
            </div>
        </LoginAnimation>
    );
}

Login.propTypes = {}

export default Login