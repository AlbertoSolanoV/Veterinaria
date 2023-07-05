import React, { useState, useEffect } from 'react'
import { useForm } from '../hooks/useForm'
import { show_alert } from "../Functions/showAlert";
import { useNavigate } from 'react-router-dom';

export const LoginForm = () => {
    const url = "https://n4vd03p5e8.execute-api.us-east-1.amazonaws.com/login";
    const [error, seterror] = useState(false);
    const navigate = useNavigate();
    const { correo, contrasena, onInputChange } = useForm({
        correo: '',
        contrasena: ''
    });


    const onSubmit = (event) => {
        event.preventDefault();
        if (correo === "" || contrasena === "") {
            seterror(true);
            show_alert("Ingrese los campos que se indican", "warning");
        } else {
            seterror(false);
            const parameters = {
                correo: correo,
                contrasena: contrasena
            }

            getUsuario(parameters, url);
        }
    }

    const getUsuario = async (parameters, url) => {
        console.log(parameters, url);

        try {
            const response = await fetch(url, {
                method: 'post',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(parameters)
            });


            if (!response.ok) {
                throw new Error("Error en la respuesta de la petición.");
            }
            const data = await response.json();

            console.log(data);
            console.log(data.body[0].idUsuario);

            const tipo = data.status;

            if (tipo === 200) {
                sessionStorage.setItem("idCliente", data.body[0].idUsuario);
                if(data.body[0].role === 'Cliente'){
                    navigate("/Pets");
                }else{
                    navigate("/agregarCita");
                }
            }

        } catch (error) {
            show_alert("Hubo un error en la petición:" + error, "warning");
        }
    };

    return (
        <>
            <form onSubmit={onSubmit} className="form-group">
                <input

                    placeholder="Correo"
                    name="correo"
                    type="email"
                    className="form-control"
                    onChange={onInputChange}
                />
                <input
                    placeholder="Contraseña"
                    name="contrasena"
                    type="password"
                    className="form-control mt-3"
                    onChange={onInputChange}
                />
                <button className="btn btn-primary mt-3">Iniciar Sesión</button>
            </form>
        </>
    )
}
