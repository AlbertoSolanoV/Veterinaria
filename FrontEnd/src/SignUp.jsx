import React from 'react'
import { SignUpForm } from './Components/SignUpForm';
import './styles/Login.css';
export const SignUp = () => {
    return (
        <>
            <div className="div-center">
                <h1>Registrarse</h1>
                <hr />
                <SignUpForm />
            </div>
        </>
    )
}
