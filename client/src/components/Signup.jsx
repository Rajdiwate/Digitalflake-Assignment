import React, { useContext, useState } from 'react'
import loginLogo from '../assets/logo.png'
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import {  registerUser } from '../api/userApi';
import { loginSignupContext } from '../context/loginSignupContext';

const Signup = () => {
    const navigate =useNavigate()
    const [email , setEmail] = useState("")
    const [name , setName] = useState("")
    const [password , setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const loginState = useContext(loginSignupContext)

    const showLogin = ()=>{
        loginState.setIsLogin(true)
    }

    const handleSignUp = async(e) => {
        e.preventDefault();
        const response = await registerUser({name  , email , password})
        if(response){
            showLogin()
        }
    }
  return (
    <div className="relative w-full max-w-md bg-white shadow-xl rounded-lg z-20 lg:left-[-190px] lg:top-4 py-8 left-0  top-0">
                <div className="flex flex-col items-center space-y-2  bg-white">
                    <img src={loginLogo} alt="loginLogo" className='h-20' />
                    <p className="text-gray-400 text-center text-lg">Welcome to Digitalflake admin</p>
                </div>

                {/* Form fields */}
                <form className="p-6 space-y-6 bg-white">
                <div className="relative">
                        <label htmlFor="name" className="absolute text-sm font-medium text-gray-700 -top-2 left-3 bg-white px-1">
                            Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Enter your name"
                            className="w-full bg-white border border-gray-300 p-3 pt-5 rounded-md"
                            onChange={(e)=>{setName(e.target.value)}}
                        />
                    </div>
                    <div className="relative">
                        <label htmlFor="email" className="absolute text-sm font-medium text-gray-700 -top-2 left-3 bg-white px-1">
                            Email-id
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            className="w-full bg-white border border-gray-300 p-3 pt-5 rounded-md"
                            onChange={(e)=>{setEmail(e.target.value)}}
                        />
                    </div>

                    <div className="relative">
                        <label htmlFor="password" className="absolute text-sm font-medium text-gray-700 -top-2 left-3 bg-white px-1">
                            Password
                        </label>
                        <div>
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                className="w-full bg-white border border-gray-300 p-3 pt-5 rounded-md pr-10"
                                onChange={(e)=>{setPassword(e.target.value)}}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                            >
                                {
                                    showPassword ? <FaRegEyeSlash />
                                        : <FaRegEye />
                                }
                            </button>
                        </div>
                    </div>

                    <div className="text-right">
                        <Link to="/forgot-password" className="text-sm text-purple-600 hover:underline">
                            Forgot Password?
                        </Link>
                    </div>

                    <button className="w-full bg-[#5C218B] hover:bg-[#4a1a6d] text-white p-3 rounded-md" onClick={handleSignUp}>
                        SignUp
                    </button>
                    <div className='text-center'>Already Have An Account? <span onClick={showLogin} className='text-blue-700 hover:underline hover:cursor-pointer'>login</span></div>
                </form>

            </div>
  )
}

export default Signup