import React, { useEffect } from 'react'

// Hooks
import useValidateLogin from '../hooks/useValidateLogin'
import Nav from '../components/Nav'

// library
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'

const Error = () => {
    
    useValidateLogin()
    useEffect(() => {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'The page does not exist',  
            background: "#232323",
            color: "#fff"
          })
    }, [])
    

    return (
        <div className='row'>
            <Nav />
            <Link to="/" className='col-10 col-sm-8 col-lg-6 btn btn-primary m-auto p-3 px-5 mt-5'>Home</Link>
        </div>
    )
}

export default Error