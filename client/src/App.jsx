import React, { useEffect, useState } from 'react'
import SideBar from './components/SideBar'
import { Outlet, useNavigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import { useContext } from 'react'
import { logoutContext } from './context/logoutContext'
import LogoutConfirmation from './components/LogoutConfirmation'
import { getUser } from './api/userApi'
import { useDispatch } from 'react-redux'
import { login,logout } from './redux/authSlice'
import { deleteContext } from './context/deleteContext'
import DeleteConfirmation from './components/DeleteConfirmation'

const App = () => {
    const logoutState = useContext(logoutContext)
    const deleteState = useContext(deleteContext)
    const [loading , setLoading] = useState(true)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(()=>{
        getUser().then((user) => {
            if(!user){
              dispatch(logout());
              
            } else{
              dispatch(login({ user :user.data}))
            }
        })
        .finally(()=>setLoading(false))
    },[])

    if(loading) return <div>Loading...</div>

    
    return (
        <div className='flex flex-col h-screen'>
            <Navbar />
            <div className="flex flex-grow">
                <SideBar />
                <Outlet />
            </div>

            {/* Logout */}
            {logoutState.logout && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
                    <LogoutConfirmation />
                </div>
            )}

            {deleteState.del && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
                    <DeleteConfirmation />
                </div>
            )}
        </div>
    );
}

export default App