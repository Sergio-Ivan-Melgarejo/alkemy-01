import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import LoginContext from '../Context/LoginContext';
import "./Login.scss"
import logo from "../logo.svg"

// Librerias
const axios = require('axios');
const Swal = require('sweetalert2')

const Login = () => {
    const [msgEmail, setMsgEmail] = useState(false)
    const [msgPassword, setMsgPassword] = useState(false)
    const [msgLogin, setMsgLogin] = useState(false)
    const [loader, setLoader] = useState(false)

    const navigate = useNavigate()
    const { setLogin, login } = useContext(LoginContext)

    useEffect(() => {
        // Redirige si vuelve al login y ya esta registrado
        if(login) navigate("/")
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        const email = e.target.email.value;
        const password = e.target.password.value;

        setLoader(true)

        const regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        if (email === "") {
            setMsgEmail("El email no puede estar vacio")
            setLoader(false)
            return
        }
        setMsgEmail(false)
        if (password === "") {
            setMsgPassword(true)
            setLoader(false)
            return
        }
        setMsgPassword(false)

        if (email !== "" && !regexEmail.test(email)) {
            setMsgEmail("El email no es valido")
            setLoader(false);
            return
        }

        if (email !== "challenge@alkemy.org" || password !== "react") {
            setMsgLogin(true)
            setLoader(false);
            return
        }
        setMsgLogin(false)

        // si todo esta ok
        const URL = "http://challenge-react.alkemy.org/";
        axios.post(URL, {
            email: email,
            password: password
        })
            .then(res => {
                if (res.status === 200) {
                    localStorage.setItem("token", res.data.token);
                    setLogin(res.data.token)
                    navigate("/")
                }
            })
            .catch(error => {
                console.dir(error)
                Swal.fire({
                    icon: "error",
                    title: 'El server no responde',
                    text: 'hubo un error del lado del servidor, intentelo mas tarde.'
                })
            })

        // un reseteo por la dudas
        setLoader(false);
    }

    return (
        <div className='login col'>
            <img className='logo-form p-5 App-logo' src={logo} alt="" />

            <div className='form-container rounded'>
                {
                    loader
                    ?   <>
                            <Loader />
                            <h3 className='h3'>Procesando la petición...</h3>
                            </>
                    :   <form className='form p-3' onSubmit={handleSubmit}>
                            <h2 className='py-3'>Formulario de login</h2>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Correo electronico</label>
                                <input id='email' type="email" name="email" className="form-control" autoComplete='current-email' />
                                {
                                    msgEmail ? <p className="form-text text-danger">{msgEmail}</p> : null
                                }
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Contraseña</label>
                                <input name="password" autoComplete='current-password' type="password" className="form-control" id="password" />
                                {
                                    msgPassword ? <p className="form-text text-danger">La contraseña no puede estar vacio</p> : null
                                }
                            </div>
                            <button type="submit" className="btn btn-primary w-100">Submit</button>
                            {
                                msgLogin ? <p className="form-text text-danger">No estas registrado</p> : null
                            }
                        </form>
                }
                <p className='text-center'>
                    ● Email: challenge@alkemy.org
                    ● Password: react
                </p>
            </div>
        </div>
    )
}

export default Login