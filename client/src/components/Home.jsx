import React from 'react'
import logo from "../assets/logo.png"

const Home = () => {
  return (
    <main className='flex flex-col justify-center items-center flex-1 '>
        <img src={logo} alt="Logo" />
        <div className='text-xl font-semibold text-gray-500'>Welcome to Digitalflake admin</div>
    </main>
  )
}

export default Home