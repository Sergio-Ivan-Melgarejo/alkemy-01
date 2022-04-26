import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import LoginContext from '../Context/LoginContext'

const useValidateLogin = () => {
    const navigate = useNavigate()
    const {login} = useContext(LoginContext)
    useEffect(() => {
        console.log("compueba useValidateLogin")
        if(!login) navigate("/login")
    }, [login,navigate])

    return login
}

export default useValidateLogin

// como era antes
    // const navigate = useNavigate()
    // const {login} = useContext(LoginContext)
    // useEffect(() => {
    //     if(!login) navigate("/login")
    // }, [login,navigate])