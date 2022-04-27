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
        if (login) navigate("/")
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        if(loader) return

        const email = e.target.email.value;
        const password = e.target.password.value;

        const regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        if (email === "") {
            setMsgEmail("El email no puede estar vacio")
            return
        }
        setMsgEmail(false)
        if (password === "") {
            setMsgPassword(true)
            return
        }
        setMsgPassword(false)

        if (email !== "" && !regexEmail.test(email)) {
            setMsgEmail("El email no es valido")
            return
        }

        if (email !== "challenge@alkemy.org" || password !== "react") {
            setMsgLogin(true)
            return
        }
        setMsgLogin(false)

        // si todo esta ok
        setLoader(true)
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
                    setLoader(false)
                }
            })
            .catch(error => {
                console.dir(error)
                Swal.fire({
                    icon: "error",
                    title: 'El server no responde',
                    text: 'hubo un error del lado del servidor, intentelo mas tarde.'
                })
                setLoader(false)
            })
    }

    return (
        <div className='login col'>
            <div className='form-container rounded'>
                <div className='row w-100 m-auto'>
                    {
                        loader
                        ? <Loader />
                        : <img className='logo-form p-1 App-logo' src={logo} alt="" />
                    }
                </div>

                <form className='form' onSubmit={handleSubmit}>
                    <h1 className='h2 mb-3'>Iniciar sesión</h1>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label" >Correo electronico</label>
                        <input id='email' type="email" name="email" className="form-control" autoComplete='current-email' placeholder='challenge@alkemy.org' tabIndex={loader ? -1 : 0} />
                        {
                            msgEmail ? <p className="form-text text-danger">{msgEmail}</p> : null
                        }
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Contraseña</label>
                        <input name="password" autoComplete='current-password' type="password" className="form-control" id="password" placeholder='react' tabIndex={loader ? -1 : 0} />
                        {
                            msgPassword ? <p className="form-text text-danger">La contraseña no puede estar vacio</p> : null
                        }
                    </div>
                    <button type="submit" className={(loader ? "disabled " : "") + "btn btn-primary w-100"} tabIndex={loader ? -1 : 0}>Submit</button>
                    {
                        msgLogin ? <p className="form-text text-danger">No estas registrado</p> : null
                    }
                    <p className={(loader ? "open rounded " : "") + 'form-modal h3 text'}>
                        Cargando ...
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Login