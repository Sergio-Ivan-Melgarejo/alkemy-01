import { createContext } from "react";

const UserContext = createContext({
    login: false,
    dark: false
})

export default UserContext;