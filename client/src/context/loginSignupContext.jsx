import { createContext, useState } from "react";

export const loginSignupContext = createContext(null)

export const LoginSignupProvider = ({children}) =>{
    const [isLogin , setIsLogin] =  useState(false)
    

    return(
        <loginSignupContext.Provider value={{setIsLogin, isLogin }} >
            {children}
        </loginSignupContext.Provider>
    )
}