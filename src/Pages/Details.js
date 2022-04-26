import React from 'react'

// Hooks
import useValidateLogin from '../hooks/useValidateLogin'

// Components
import Nav from '../components/Nav'

const Details = () => {

    useValidateLogin()

    const endPoint = "https://api.spoonacular.com/recipes/{id}/información"
    return (
        <>
            <Nav />
        </>
    )
}

export default Details