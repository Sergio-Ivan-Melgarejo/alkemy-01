import React, { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom';
import LoginContext from '../Context/LoginContext';
import logo from "../logo.svg"
import "./Nav.scss"

const Swal = require('sweetalert2')

const Nav = () => {
    const {setLogin} = useContext(LoginContext);

    const handleClick = async () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to log out?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: "Yes, I'm sure!"
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'closed session',
                'bye now',
              )
              setLogin(false)
              localStorage.removeItem("token")
            }
          })
    }

    return (
      <nav className="position-sticky top border-bottom navbar navbar-expand-md navbar-dark w-100 bg-dark">
        <div className="container-fluid">
          
          <Link to="/" className="navbar-brand d-flex align-items-center">
            <img className='App-logo d-inline-block align-text-top ' width="50" height="40" src={logo} alt=""/>
            <h1 className='h4 m-0'>React App</h1>
          </Link>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="p-1 navbar-nav m-auto align-items-center me-2 mb-lg-0 text-center text-lg-start">
              <li className="nav-item pe-3">
                <NavLink className={({isActive})=> isActive ? "nav-link active" : "nav-link" } to="/">Menu</NavLink>
              </li>
              <li className="nav-item pe-3">
                <NavLink className={({isActive})=> isActive ? "nav-link active" : "nav-link" } to="/search">Recipes</NavLink>
              </li>
              <li>
                <button className='btn btn-outline-primary p-2 px-4' onClick={handleClick} >Sign off</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      
        // <nav className='d-flex justify-content-between align-items-center'>
        //     <img className='img-fluid' style={{maxWidth:"100px"}} src={logo} alt=""/>
        //     <ul>
        //       <li>
        //         <NavLink className={({isActive})=> isActive ? "nav-link active" : "nav-link" } to="/">Menu</NavLink>
        //       </li>
        //       <li>
        //         <NavLink className={({isActive})=> isActive ? "nav-link active" : "nav-link" } to="/search">Buscador</NavLink>
        //       </li>
        //     </ul>
        // </nav>
    )
}

export default Nav