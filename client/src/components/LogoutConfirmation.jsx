import deleteAlert from "../assets/delete-alert.png"
import { useContext } from "react"
import { logoutContext } from "../context/logoutContext"
import { logout } from "../api/userApi"
import { useNavigate } from "react-router-dom"

export default function LogoutConfirmation() {
    const logoutState = useContext(logoutContext)
    const navigate = useNavigate()

    const handleLogout = async()=>{
       const success = await logout()
       if(success){
        logoutState.setLogout(false)
        navigate('/')
       }
    }

  return (
   
    <div className="w-full max-w-sm mx-auto  p-6 bg-white rounded-lg"> 
    <div className="flex flex-row items-center gap-4 justify-center mb-4">
      <img src={deleteAlert} alt="alert" className="h-6 w-6" /> 
      <div className="text-xl font-semibold">Logout</div>
    </div>
    
    <div className="text-center mb-6"> 
      <p className="text-gray-500">Are you sure you want to Logout?</p>
    </div>
  
    <div className="flex justify-center gap-4 mt-6"> 
      <button className="bg-gray-300 rounded-lg p-2" onClick={()=>{logoutState.setLogout(false)}}>Cancel</button> 
      <button className="bg-[#5C218B] hover:bg-purple-800 rounded-lg p-2 text-white" onClick={handleLogout}>Confirm</button>
    </div>
  </div>
  
   
  )
}