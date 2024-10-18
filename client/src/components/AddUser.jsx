import { Link, useNavigate } from "react-router-dom"
import leftArrow from "../assets/leftArrow.png"
import { useEffect, useState } from 'react'
import uploadIcon from  "../assets/upload.png"
import avatar2 from "../assets/avatar2.png"
import { addUser } from "../api/userApi"
import {  getRoles } from "../api/roleApi"

export default function AddUser() {
  const [name, setName] = useState('')
  const [mobile, setMobile] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')
  const [avatar, setAvater] = useState(null)
  const [roles , setRoles] = useState([])
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    addUser({avatar,email ,mobile ,name , role}).then((success)=>{
      if(success) navigate('/users')
    })
  }

  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setAvater(e.target.files[0])
    }
  }

  useEffect(()=>{
    getRoles().then((roles)=>{
      console.log(roles)
      setRoles(roles)
    })
  },[])

  return (
    <div className="flex flex-col  bg-white">
      <div className="flex-grow p-6">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center mb-6">
            <Link to="/users">
              <button type="button" className="mr-2">
                <img src={leftArrow} alt="Back" className="h-4 w-4" />
              </button>
            </Link>
            <h1 className="text-2xl font-semibold">Add User</h1>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2"
                  placeholder="Enter name"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="mobile" className="text-sm font-medium text-gray-700">
                  Mobile
                </label>
                <input
                  id="mobile"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2"
                  placeholder="Enter mobile number"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email-Id
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2"
                  placeholder="Enter email"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="role" className="text-sm font-medium text-gray-700">
                  Role
                </label>
                <select
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2"
                  required
                >
                  <option value="" disabled>Select role</option>
                  {roles.map((role)=>(
                      <option key={role.id} value={role.name}>{role.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Upload Image
              </label>
              <div className="flex items-center space-x-4">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
                  {avatar ? (
                    <img
                      src={URL.createObjectURL(avatar)}
                      alt="User"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src={avatar2}
                      alt="Default user"
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <label htmlFor="image-upload" className="cursor-pointer">
                  <div className="flex flex-col items-center space-x-2 text-sm text-gray-600">
                    <img src={uploadIcon} alt="Upload" className="h-14" />
                    <span>Upload (Max file size: 10MB)</span>
                  </div>
                  <input
                    id="image-upload"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="border-t border-gray-200">
        <div className="max-w-2xl mx-auto p-6">
          <div className="flex justify-end space-x-4">
            <Link to="/users">
            <button type="button" className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md">
              Cancel
            </button></Link>
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md"
              onClick={handleSubmit}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>

  )
}