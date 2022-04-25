import React from 'react'

const HeaderHome = ({select}) => {
  return (
    <header className='header mt-5'>
        <div className='row justify-content-center text-center gap-1 p-1'>
            <button className={(select.length > 0 ? "btn btn-outline-primary " : "btn btn-secondary ") + 'order-sm-1 col col-sm-2 order-2 p-1'}>resetear</button>
            <h2 className='col-12 col-sm order-sm-2 order-1 p-0'>Menu</h2>
            <button className={(select.length === 4 ? "btn btn-outline-primary " : "btn btn-secondary ") + 'order-sm-3 col col-sm-2 order-3 p-1'}>ordernar</button>
        </div>
    </header>
  )
}

export default HeaderHome