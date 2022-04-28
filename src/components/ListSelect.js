import React from 'react'
import Plate from './Plate';

const plateInitialData = {
    title: "Empty",
    summary: "have to selet a recipe.",
    vacio: true
}

const ListSelect = ({state, handleDelete}) => {
    return (
        <section className='row m-auto w-100 py-5'>
            { 
                state.map((ele,i)=> <Plate key={`plate-${i}`} data={ele} />)
            }
            {
                Array(4 - state.length).fill(plateInitialData).map((ele,i)=> <Plate key={`plate-${i}`} data={ele} />) 
            }
        </section>
    )
}

export default ListSelect