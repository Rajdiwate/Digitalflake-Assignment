import React, { useContext } from 'react'
import navLogo from "../assets/nav-logo.png"
import profileLogo from "../assets/profile-logo.png"
import { logoutContext } from '../context/logoutContext'


const Navbar = () => {
    const logoutState = useContext(logoutContext)
  return (
    <nav className='bg-[#662671] w-full h-14 flex justify-between items-center p-5'>
        <img src={navLogo} alt="nav-logo" className='h-8 w-40' />
        <img src={profileLogo} alt="profile-logo" className='h-7 ' onClick={()=>{logoutState.setLogout(true)}}  />
    </nav>
  )
}

export default Navbar