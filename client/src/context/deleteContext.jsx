import { createContext, useState } from "react";

export const deleteContext = createContext(null)

export const DeleteProvider = ({children}) =>{
    const [del , setDel] =  useState(false)
    const [id , setId] = useState(null)
    const [isUserDelete , setIsUserDelete] = useState(true)

    return(
        <deleteContext.Provider value={{del, setDel , isUserDelete ,setIsUserDelete , id , setId}} >
            {children}
        </deleteContext.Provider>
    )
}