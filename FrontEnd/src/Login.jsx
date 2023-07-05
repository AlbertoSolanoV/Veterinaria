import React from 'react'
import { LoginForm } from './Components/LoginForm'
import './styles/Login.css';
export const Login = () => {
    return (
        <>

            <div className="div-center">
                <h1>Login</h1>
                <hr />
                <LoginForm />
            </div>
        </>
    )
}
