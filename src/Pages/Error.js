import React from 'react'
import { Link } from 'react-router-dom'
import "./Error.scss"

// Components
import MsgError from '../components/MsgError'

// Hooks
import useValidateLogin from '../hooks/useValidateLogin'
import Nav from '../components/Nav'

const Error = () => {
    
    useValidateLogin()

    return (
        <div className='errorPage border'>
            <Nav />
            <MsgError className="m-0" msg="La Pagina no existe" />
        </div>
    )
}

export default Error