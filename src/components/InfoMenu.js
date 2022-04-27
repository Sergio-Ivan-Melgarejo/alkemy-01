import React from 'react'

const InfoMenu = ({select}) => {
    const handlePrecio = () => "añadir logica a la function"
    const handleTiempo = () => "añadir logica a la function"
    const handleScore = () => "añadir logica a la function"
    return (
        <section className='p-1 w-100 m-auto pb-5'>
            <h2 className='h3'>Info Menu (average)</h2>
            <ul className="row p-0 text-center">
                <li className="col-12 col-sm-6 col-md-4 list-group-item bg-dark text-light">
                    Price per portion: <span className='text-primary'>{select.length > 0 ? handlePrecio : "no data"}</span>
                </li>
                <li className="col-12 col-sm-6 col-md-4 list-group-item bg-dark text-light">
                    Time: <span className='text-primary'>{select.length > 0 ? handleTiempo : "no data"}</span>
                </li>
                <li className="col-12 col-sm-6 col-md-4 list-group-item bg-dark text-light">
                    Healt Score: <span className='text-primary'>{select.length > 0 ? handleScore : "no data"}</span>
                </li>
            </ul>
        </section>
    )
}

export default InfoMenu