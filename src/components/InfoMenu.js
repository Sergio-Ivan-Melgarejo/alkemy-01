import React from 'react'

const InfoMenu = ({select}) => {
    console.log(select.length)

    const handlePrecio = () => "añadir logica a la function"
    const handleTiempo = () => "añadir logica a la function"
    const handleScore = () => "añadir logica a la function"
    return (
        <section className='p-1 w-100 m-auto pb-5'>
            <h2 className='h3'>Info Menu (promedio)</h2>
            <ul className="row p-0 text-center">
                <li className="col-12 col-sm-6 col-md-4 list-group-item bg-dark text-light">
                    Precio: <span className='text-primary'>{select.length > 0 ? handlePrecio : "sin datos"}</span>
                </li>
                <li className="col-12 col-sm-6 col-md-4 list-group-item bg-dark text-light">
                    tiempo: <span className='text-primary'>{select.length > 0 ? handleTiempo : "sin datos"}</span>
                </li>
                <li className="col-12 col-sm-6 col-md-4 list-group-item bg-dark text-light">
                    Healt Score: <span className='text-primary'>{select.length > 0 ? handleScore : "sin datos"}</span>
                </li>
            </ul>
        </section>
    )
}

export default InfoMenu