import React  ,{useEffect , useState} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Protected = ({children }) => {
    const navigate = useNavigate()
    const [loader ,setLoader] =  useState(true)
    const authStatus = useSelector(state=> state.auth.isLoggedIn)

    useEffect(()=>{
        if(!authStatus){
            navigate("/")
        }
        
        setLoader(false)
    } , [authStatus , navigate ])


  return (
    loader? <h1>loading...</h1> : <>{children}</> 
  )
}

export default Protected