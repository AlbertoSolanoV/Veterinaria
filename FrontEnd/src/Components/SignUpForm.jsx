import React, { useState, useEffect } from 'react'
import { useForm } from '../hooks/useForm'
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { show_alert } from "../Functions/showAlert";
import { useNavigate } from "react-router-dom";

export const SignUpForm = () => {
    const url = "https://n4vd03p5e8.execute-api.us-east-1.amazonaws.com/signup";
    const method = "POST";
    const navigate = useNavigate();
    const [error, seterror] = useState(false);


    const { nombre, apellidos, correo, contrasena, onInputChange } = useForm({
        nombre: '',
        apellidos: '',
        correo: '',
        contrasena: ''
    });


    const handleSubmit = (event) => {
        event.preventDefault();
        if (nombre === "" || apellidos === "" || correo === "" || contrasena === "") {
            seterror(true);
            show_alert("Llene los campos correspondientes", "warning");
        } else {
            seterror(false);
            const parameters = {
                nombre: nombre,
                apellidos: apellidos,
                correo: correo,
                contrasena: contrasena,
                role: 'Cliente'
            }

            enviarSolicitud(parameters, method, url);
        }
    }

    const enviarSolicitud = async (parametros, metodo, url) => {
        try {
            console.log(parametros);
            const response = await fetch(url, {
                method: metodo,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(parametros),
            });
            if (!response.ok) {
                throw new Error("Error en la respuesta de la petición.");
            }
            const data = await response.json();
            console.log(data);
            const tipo = data.status;
            const body = JSON.parse(data.body);
            
            if (tipo === 200) {
                sessionStorage.setItem("idCliente", body.idUsuario);
                sessionStorage.setItem("role", body.role);
                navigate('/Pets');
            }
            
        } catch (error) {
            show_alert("Error en la solicitud", "error");
            console.log(error);
        }
    };



    return (
        <form onSubmit={handleSubmit} className="form-group">
            <input
                className="form-control mb-3"
                type="text"
                placeholder="Nombre"
                name="nombre"
                onChange={onInputChange}
            />
            <input
                className="form-control mb-3"
                type="text"
                placeholder="Apellidos"
                name="apellidos"
                onChange={onInputChange}
            />
            <input
                className="form-control mb-3"
                type="email"
                placeholder="Correo Electrónico"
                name="correo"
                onChange={onInputChange}
            />
            <input
                className="form-control mb-3"
                type="password"
                placeholder="Contraseña"
                name="contrasena"
                onChange={onInputChange}
            />
            <button className="btn btn-primary mb-3">
                Registrarse
            </button>
        </form>
    )
}
