import { createContext, useState } from "react";

export const logoutContext = createContext(null)

export const LogoutProvider = ({children}) =>{
    const [logout,setLogout] =  useState(false)

    return(
        <logoutContext.Provider value={{logout , setLogout}} >
            {children}
        </logoutContext.Provider>
    )
}