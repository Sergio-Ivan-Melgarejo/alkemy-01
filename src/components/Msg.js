import React from 'react'
import ButtonToUp from './ButtonToUp'

const Msg = () => {
  return (
    <>
        <p className='position-absolute top-0 start-0 p-4 text-secondary' id='goTop'>
            Echo por <a href="https://portfolio-profesional-sergio-ivan-megarejo.netlify.app/" target="_blank" rel="noreferrer">Sergio Ivan Melgarejo</a>
        </p>
        <ButtonToUp />
    </>
  )
}

export default Msg