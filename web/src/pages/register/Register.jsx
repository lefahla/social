import React, { useRef } from 'react'
import './register.css'

export default function Register() {
    const username = useRef()
    const email = useRef()
    const password = useRef()
    const passwordAgain = useRef()

    const handleRegister = (e) => {
        e.preventDefault();

        if (password.current.value !== passwordAgain.current.value)
            passwordAgain.current.setCustomValidity("Password dnt't match");
    }


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
                    <form className="loginBox" onSubmit={handleRegister}>
                        <input required type="text" placeholder='Username' ref={username} className="loginInput" />
                        <input required type="email" placeholder='Email' ref={email} className="loginInput" />
                        <input required type="password" minLength="6" placeholder='Password' ref={password} className="loginInput" />
                        <input required type="password" minLength="6" placeholder='Repeat password' ref={passwordAgain} className="loginInput" />

                        <button type="submit" className="loginButton">Create New User</button>
                        <button className="loginRegisterButton">Log into your account</button>
                    </form>
                </div>

            </div>
        </div>
    )
}
