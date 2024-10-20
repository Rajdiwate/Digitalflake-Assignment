import { Link, useNavigate } from "react-router-dom"
import leftArrow from "../assets/leftArrow.png"
import { useState } from 'react'
import { addRole } from "../api/roleApi"


export default function AddRole() {
  const [roleName, setRoleName] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    addRole(roleName).then((success)=>{
      if(success){
        navigate('/roles')
      }
      else{
        console.log('Error in adding role')
      }
    })
  }

  return (
    <div className="flex flex-col justify-start bg-white">
  <div className="flex-grow p-6">
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center mb-6">
        <Link to="/roles">
          <button className="mr-2">
            <img src={leftArrow} className="h-4 w-4" />
          </button>
        </Link>
        <h1 className="text-2xl font-semibold">Add Role</h1>
      </div>

      {/* Form Section */}
      <form className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="roleName" className="text-sm font-medium text-gray-700">
            Role Name
          </label>
          <input
            id="roleName"
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
            className="w-full border border-gray-500 rounded-lg p-2"
            placeholder="Enter role name"
          />
        </div>

        {/* Buttons Section (just below the form) */}
        <div className="flex justify-end space-x-4">
          <Link to="/roles">
            <button variant="outline" type="button">
              Cancel
            </button>
          </Link>
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 text-white p-1 rounded-lg"
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
</div>
  )
}