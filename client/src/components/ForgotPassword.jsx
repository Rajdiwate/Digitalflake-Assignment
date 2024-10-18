import { Link, useNavigate } from "react-router-dom";
import { forgetPassword } from "../api/userApi";
import { useState } from "react";

export default function ForgotPassword() {
  const [email , setEmail]  = useState("")
  const navigate = useNavigate();
  const handleResetPassword = async(e)=>{
    e.preventDefault()
      const response = await forgetPassword(email)
      if(response){
        alert("Email sent successfully to " , email)
        navigate('/')
      }
      
  }
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-[#5C218B33] ">
  <div className="w-full max-w-md mx-auto py-5 px-5 bg-white rounded-lg" >
    <div>
      <div className="text-2xl font-semibold text-center text-[#5C218B]">
        Did you forget your password?
      </div>
      <div className="text-center text-gray-500">
        Enter your email address and we'll send you a link to restore your password.
      </div>
    </div>
    <div>
      <form className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-gray-400">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md p-2"
            onChange={(e)=>{setEmail(e.target.value)}}
          />
        </div>
        <button className="w-full bg-[#5C218B] hover:bg-purple-700 text-white py-2 rounded-md transition-colors" onClick={handleResetPassword}>
          Request reset link
        </button>
      </form>
      <div className="mt-4 text-center">
        <Link to="/" className="text-sm text-gray-600 hover:underline">
          Back to log in
        </Link>
      </div>
    </div>
  </div>
</div>

  )
}