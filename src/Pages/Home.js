import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import HeaderHome from '../components/HeaderHome';
import InfoMenu from '../components/InfoMenu';
import ListSelect from '../components/ListSelect';
import Nav from '../components/Nav';
import LoginContext from '../Context/LoginContext';

let getSelect = localStorage.getItem("select");
if(getSelect) getSelect = JSON.parce(getSelect)

const Home = () => {
    // redirige a login si no esta registrado
    const navigate = useNavigate()
    const {login} = useContext(LoginContext)
    useEffect(() => {
        if(!login) navigate("/login")
    }, [login,navigate])

    // datos de los seleccionados
    const [select, setSelect] = useState(getSelect || [])

    return (
      <>
        <Nav />
        <HeaderHome select={select} />
        <ListSelect select={select} />
        <InfoMenu select={select} />
      </>
  )
}

export default Home