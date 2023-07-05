import React, { useEffect } from 'react'
import { useState } from 'react'
import { Outlet, Link, useNavigate, NavLink } from 'react-router-dom'


export const Navbar = () => {
    const [visible, setvisible] = useState(true);
    const [cliente, setcliente] = useState(true);
    const navigate = useNavigate();

    let id = sessionStorage.getItem("idCliente");
    let role = sessionStorage.getItem("role");

    const cargar = () =>{ //<----------------------------
        if (id == null) {
            setvisible(true);
        } else {
            setvisible(false);
        }
        console.log(role);
        if (role == "Cliente") {
            setcliente(false);
        } else {
            setcliente(true);
        }
    }
    useEffect(() => {
        cargar();
      }, []);

    const cerrarSesion = () => {
        sessionStorage.clear();
        navigate("/");
    }


    return (
        <>
            {visible ? (<nav className="navbar bg-body-tertiary">
                <div className="container-fluid">

                    <a className="navbar-brand" href="#"> <img src="/dog.svg" height={25} /> Veterinaria</a>
                    <ul className="nav justify-content-end" on>
                        <li className="nav-item">
                            <NavLink className="nav-link" to={`/Login`}>Iniciar Sesion</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to={`/SignUp`}>Registrarse</NavLink>
                        </li>
                    </ul>
                </div>

            </nav>) : (

                <>
                    {cliente ? (<nav className="navbar bg-body-tertiary">
                        <div className="container-fluid">
                            <a className="navbar-brand" href="#"> <img src="/dog.svg" height={25} /> Veterinaria</a>
                            <ul className="nav justify-content-end">
                                <li className="nav-item">
                                    <NavLink className="nav-link" to={`/Pets`}>Mascotas</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to={`/citasDispo`}>Citas</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" onClick={() => cerrarSesion()}  to={`/`}>Cerrar Sesión</NavLink>
                                </li>
                            </ul>
                        </div>
                    </nav>) : (<nav className="navbar bg-body-tertiary">
                        <div className="container-fluid">
                            <a className="navbar-brand" href="#"> <img src="/dog.svg" height={25} /> Veterinaria</a>
                            <ul className="nav justify-content-end">
                                <li className="nav-item">
                                    <NavLink className="nav-link" to={`/agregarCita`} >Administrador de citas</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" onClick={() => cerrarSesion()} to={`/`}>Cerrar Sesión</NavLink>
                                </li>
                            </ul>
                        </div>
                    </nav>)}

                </>
            )
            }
        </>
    )
}