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
            setMsgEmail("The email cannot be empty")
            return
        }
        setMsgEmail(false)
        if (password === "") {
            setMsgPassword(true)
            return
        }
        setMsgPassword(false)

        if (email !== "" && !regexEmail.test(email)) {
            setMsgEmail("The email is not valid")
            return
        }

        if (email !== "anonimo@email.com" || password !== "react") {
            setLoader(true)
            setTimeout(()=>{
                setLoader(false)
                setMsgLogin(true)
            },1000)
            return
        }
        setMsgLogin(false)

        // si todo esta ok
        setLoader(true)
    
        // como callo la api,lo emulo
        // const URL = "http://challenge-react.alkemy.org/";
        // axios.post(URL, {
        //     email: email,
        //     password: password
        // })
        //     .then(res => {
        //         if (res.status === 200) {
        //             localStorage.setItem("token", res.data.token);
        //             setLogin(res.data.token)
        //             navigate("/")
        //             setLoader(false)
        //         }
        //     })
        //     .catch(error => {
        //         // console.dir(error)
        //         Swal.fire({
        //             icon: "error",
        //             title: 'The server not responded',
        //             text: 'There was a server side error, please try again later.',
        //             background: "#232323",
        //             color: "#fff"
        //         })
        //         setLoader(false)
        //     })

        setTimeout(()=>{
            localStorage.setItem("token", "true");
            setLogin("true")
            navigate("/")
            setLoader(false)
        },1500)
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
                    <h1 className='h2 mb-3'>Login</h1>
                    <div className="form-floating mb-3">
                        <input id='email' type="email" name="email" className="form-control" autoComplete='current-email' placeholder='Email' tabIndex={loader ? -1 : 0} />
                        <label htmlFor="email" className="form-label p-3" >Email</label>
                        {
                            msgEmail ? <p className="form-text text-danger">{msgEmail}</p> : null
                        }
                    </div>
                    <div className="form-floating mb-3">
                        <input name="password" autoComplete='current-password' type="password" className="form-control" id="password" placeholder='Password' tabIndex={loader ? -1 : 0} />
                        <label htmlFor="password" className="form-label">Password</label>
                        {
                            msgPassword ? <p className="form-text text-danger">Password cannot be empty</p> : null
                        }
                    </div>
                    <button type="submit" className={(loader ? "disabled " : "") + "btn btn-primary w-100 p-3"} tabIndex={loader ? -1 : 0}>Sing in</button>
                    {
                        msgLogin ? <p className="form-text text-danger">You are not registered</p> : null
                    }
                    <p className={(loader ? "open rounded " : "") + 'form-modal h3 text'}>
                        Loading ...
                    </p>
                </form>
            </div>
                <div className='msg text-secondary text-start w-100'>
                    <p className='m-0'>email: <span>anonimo@email.com</span></p>
                    <p className='m-0'>password: <span>react</span></p>            
                </div>
        </div>
    )
}

export default Login