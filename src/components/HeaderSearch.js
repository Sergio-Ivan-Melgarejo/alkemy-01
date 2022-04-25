import React from 'react'

const HeaderSearch = ({title}) => {
  return (
    <header className='header border border-warning'>
        <form className='border border-warning row justify-content-center text-center p-1 gap-1'>
            <button className='order-sm-1 col col-sm-2 order-2 btn btn-outline-primary p-2'>Resetear</button>
            <input className='search col-12 col-sm order-sm-2 order-1 p-2' type="search" placeholder="Search" aria-label="Search" />
            <button className='btn btn-outline-success order-sm-3 col col-sm-2 order-3 p-2' type="submit">Buscar</button>
        </form>
        <h2 className='h2 text-center'>{title}</h2>
    </header>
  )
}

export default HeaderSearch