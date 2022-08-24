import React, { useContext, useRef } from 'react'
import './login.css'
import loginCall from '../../apiCalls'
import { AuthContext } from '../../context/AuthContext';
import { CircularProgress } from '@material-ui/core'
import { Route } from 'react-router-dom';
import { CodeSharp } from '@material-ui/icons';

export default function Login() {

    const _email = useRef();
    const _password = useRef();

    const { user, isFetching, dispatch } = useContext(AuthContext)

    const handleClick = (e) => {
        e.preventDefault()
        loginCall({ email: _email.current.value, password: _password.current.value }, dispatch)
    }
    console.log(" loging.jsx : ")
    console.log(user)

    return (

        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">
                        LamaLogin
                    </h3>
                    <span className="loginDesc">
                        Connect with friends and the world.
                    </span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleClick}>
                        <input type="email" placeholder='Email' className="loginInput" ref={_email} required />
                        <input type="password" placeholder='Password' className="loginInput" ref={_password} required minLength={6} />

                        <button className="loginButton" type="submit" disabled={isFetching}>
                            {isFetching ? <CircularProgress /> : "Log In"}</button>
                        <span className="loginForgot">Forgot Password</span>

                        <button className="loginRegisterButton">
                            {isFetching ? <CircularProgress /> : "Create a New Account"}
                        </button>

                    </form>
                </div>

            </div>
        </div>
    )
}
