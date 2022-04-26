import React from 'react'

const HeaderHome = ({select}) => {
  return (
      <header className='row m-auto w-100 justify-content-center text-center gap-1 p-1 py-3'>
          <button className={(select.length > 0 ? "" : "disabled ") + 'btn btn-primary order-sm-1 col col-sm-2 order-2 p-1'}>resetear</button>
          <h2 className='col-12 col-sm order-sm-2 order-1 p-0'>Menu</h2>
          <button className={(select.length === 4 ? "" : "disabled ") + 'btn btn-primary order-sm-3 col col-sm-2 order-3 p-1'}>ordernar</button>
      </header>
  )
}

export default HeaderHome