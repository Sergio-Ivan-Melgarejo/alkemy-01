import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import LoginContext from '../Context/LoginContext';
import "./Login.scss"

// Librerias
const axios = require('axios');
const Swal = require('sweetalert2')

const Login = () => {
    const [msgEmail, setMsgEmail] = useState(false)
    const [msgPassword, setMsgPassword] = useState(false)
    const [msgLogin, setMsgLogin] = useState(false)
    const [loader, setLoader] = useState(false)

    const navigate = useNavigate()
    const {setLogin} = useContext(LoginContext)

    const handleSubmit = (e) => {
        e.preventDefault()
        const email = e.target.email.value;
        const password = e.target.password.value;
        const check = e.target.check.checked;

        setLoader(true)

        const regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        if(email === ""){
            setMsgEmail(true)
            setLoader(false)
            return 
        }
        setMsgEmail(false)
        if(password === ""){
            setMsgPassword(true)
            setLoader(false)
            return 
        }
        setMsgPassword(false)

        if(email !== ""  && !regexEmail.test(email)){
            setMsgLogin(true)
            setLoader(false);
            return 
        }
        setMsgLogin(false)
        
        if(regexEmail !== "challenge@alkemy.org"  && password !== "react"){
            console.log("Credenciales Invalidas")
            return setLoader(false);
        }

        // si todo esta ok
        const URL = "http://challenge-react.alkemy.org/";
        axios.post(URL,{
            email:email,
            password:password
        })
        .then(res=> {
            if(res.status === 200){
                localStorage.setItem("token",res.data.token);
                setLogin(true)
                navigate("/")
                if(check) localStorage.setItem("login","true")
            }
        })
        .catch(error => {
            console.log(error)
            Swal.fire({
                icon: 'error 404',
                title: 'El server no responde',
                text: 'hubo un error del lado del servidor, intentelo mas tarde.',
                footer: '<a href="">Why do I have this issue?</a>'
              })
        })

        // un reseteo por la dudas
        setLoader(false);
    }

    return (
        <div className='login col'> 
            <h2>Formulario de login</h2>
                {    
                    loader 
                    ?   <>
                            <Loader />
                            <h3 className='h3'>Procesando la petición...</h3>
                        </> 
                    :   <form className='form' onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Correo electronico</label>
                                <input id='email' type="email" name="email" className="form-control" autoComplete='current-email' />
                                {
                                    msgEmail ? <p className="form-text">El email no puede estar vacio</p> : null
                                }
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Contraseña</label>
                                <input name="password" autoComplete='current-password' type="password" className="form-control" id="password"/>
                                {
                                    msgPassword ? <p className="form-text">La contraseña no puede estar vacio</p> : null
                                }
                            </div>
                            <div className="mb-3 form-check">
                                <input type="checkbox" className="form-check-input" id="check"/>
                                <label name="check" className="form-check-label" htmlFor="check">Mantener sesión activa</label>
                            </div>
                            <button type="submit" className="btn btn-primary w-100">Submit</button>
                            {
                                msgLogin ? <p className="form-text">Debes escribir una direcion de correo valida</p> : null
                            }
                            {/* <input type="submit" value="login" disabled={false} /> */}
                        </form>
                }
                <p>
                    ● Email: challenge@alkemy.org
                    ● Password: react
                </p>
        </div>
    )
}

export default Login