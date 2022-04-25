import React from 'react'
import { Link } from 'react-router-dom'

const HeaderSearch = ({title}) => {
  return (
    <header className='header w-100 pt-5'>
        <form className='row w-100 m-auto justify-content-center text-center p-1 gap-1'>
            <button className={(title ? "btn-primary " : "btn-secondary ") + 'btn order-sm-1 col col-sm-2 order-2 p-2'}>Resetear</button>
            <input className='rounded search col-12 col-sm order-sm-2 order-1 p-2' type="search" placeholder="Search" aria-label="Search" />
            <Link to={`/search${title ? ("/" + title) : ""}`} className={(title ? "btn-primary " : "btn-secondary ") + 'btn order-sm-3 col col-sm-2 order-3 p-2'} type="submit">Buscar</Link>
        </form>
        <h2 className='h2 text-center'>{title || "Recetas"}</h2>
    </header>
  )
}

export default HeaderSearch