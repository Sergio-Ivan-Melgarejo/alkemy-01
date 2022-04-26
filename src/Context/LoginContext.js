import { createContext, useState } from "react";

const LoginContext = createContext()
export default LoginContext;

// por si le da a mantener sesión activa
const getToken = localStorage.getItem("token")

const LoginProvider = ({children}) => {
    const [login, setLogin] = useState(getToken || false)

    const data = {login,setLogin}

    return <LoginContext.Provider value={data}>{children}</LoginContext.Provider>
}
export {LoginProvider};