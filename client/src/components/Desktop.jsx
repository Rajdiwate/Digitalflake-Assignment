import React, { useContext } from 'react'
import desktop from "../assets/desktop.png"
import Login from './Login'
import Signup from './Signup'
import { loginSignupContext } from '../context/loginSignupContext'


const Desktop = () => {
    const loginState = useContext(loginSignupContext)
    return (
        <div className='w-screen h-screen relative overflow-hidden flex justify-center items-center'>
            {/* Background overlay */}
            <div className='absolute inset-0 bg-[#5C218B33] z-10'></div>

            {/* Image */}
            <img src={desktop} alt="desktop-background" className='absolute w-full h-full object-cover z-0' />

            {/* Login form */}
            {loginState.isLogin?<Login/>:<Signup/>}
        </div>
    )
}

export default Desktop