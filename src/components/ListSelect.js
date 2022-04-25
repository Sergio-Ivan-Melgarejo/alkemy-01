import React from 'react'
import Plate from './Plate';

const plateInitialData = {
    title:"Vacio",
    description: "tienes que agregar un plato.",
    vacio:true
}

const ListSelect = ({select}) => {
    return (
        <section className='row py-5'>
            { 
                select.map((ele,i)=> <Plate key={`plate-${i}`} data={ele} />)
            }
            {
                Array(4 - select.length).fill(plateInitialData).map((ele,i)=> <Plate key={`plate-${i}`} data={ele} />) 
            }
        </section>
    )
}

export default ListSelect