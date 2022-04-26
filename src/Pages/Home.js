import React, { useState } from 'react'
import HeaderHome from '../components/HeaderHome';
import InfoMenu from '../components/InfoMenu';
import ListSelect from '../components/ListSelect';
import Nav from '../components/Nav';
import useValidateLogin from '../hooks/useValidateLogin';

let getSelect = localStorage.getItem("select");
if(getSelect) getSelect = JSON.parce(getSelect)

const Home = () => {
    // redirige a login si no esta registrado
    useValidateLogin()

    // datos de los seleccionados
    const [select, setSelect] = useState(getSelect || [])

    return (
      <>
        <Nav />
        <div className='p-3'>
          <HeaderHome select={select} />
          <ListSelect select={select} />
          <InfoMenu select={select} />
        </div>
      </>
  )
}

export default Home