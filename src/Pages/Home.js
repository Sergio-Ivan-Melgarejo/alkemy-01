import React from 'react'

// hook
import useValidateLogin from '../hooks/useValidateLogin';

// component
import HeaderHome from '../components/HeaderHome';
import InfoMenu from '../components/InfoMenu';
import ListSelect from '../components/ListSelect';
import Nav from '../components/Nav';

// let getSelect = localStorage.getItem("select");
// if(getSelect) getSelect = JSON.parce(getSelect)

const Home = ({state,handleReset,handleDelete,handleOrder}) => {
    // redirige a login si no esta registrado
    useValidateLogin()
    return (
      <>
        <Nav />
        <div className='p-3'>
          <HeaderHome state={state} handleReset={handleReset} handleOrder={handleOrder} />
          <ListSelect state={state} handleDelete={handleDelete} />
          <InfoMenu state={state} />
        </div>
      </>
  )
}

export default Home