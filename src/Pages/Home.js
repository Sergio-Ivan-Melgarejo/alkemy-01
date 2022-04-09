import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import UserContext from '../Context/UserContext';
import logo from '../logo.svg';

const Home = () => {
    // redirect if user is not logged
    const navigate = useNavigate()
    const UserData = useContext(UserContext)
    useEffect(() => {
        console.log(UserData)
        if(!UserData.login) navigate("/login")
    }, [UserData])
    
  


    return (
        <div>
            <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
                Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
            >
                Learn React
            </a>
            </header>
        </div>
  )
}

export default Home