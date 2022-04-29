import React from 'react'

// library
const Swal = require('sweetalert2');

const HeaderHome = ({state,handleReset,handleOrder}) => {
  const handleClickButton = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      background: "#232323",
      color: "#fff"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({ 
          title: 'Reseted!',
          icon: 'success',
          background: "#232323",
          color: "#fff"
        })
      handleReset()
      }
    })
  }

  return (
      <header className='row m-auto w-100 justify-content-center text-center gap-1 p-1 py-3'>
          <button onClick={handleClickButton} className={(state.length > 0 ? "" : "disabled ") + 'btn btn-primary order-sm-1 col col-sm-2 order-2 p-1'}>Reset</button>
          <h2 className='col-12 col-sm order-sm-2 order-1 p-0'>Menu</h2>
          <button onClick={handleOrder} className={(state.length === 4 ? "" : "disabled ") + 'btn btn-primary order-sm-3 col col-sm-2 order-3 p-1'}>Order</button>
      </header>
  )
}

export default HeaderHome