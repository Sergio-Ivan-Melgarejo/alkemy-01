import React from 'react'

// Hooks
import useValidateLogin from '../hooks/useValidateLogin'

const Error = () => {
    
    useValidateLogin()

    return (
        <h1>Error</h1>
    )
}

export default Error