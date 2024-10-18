import { useEffect, useState } from 'react'
import { editRole, getRole } from '../api/roleApi'
import { Link, useNavigate, useParams } from 'react-router-dom'
import leftArrow from "../assets/leftArrow.png"



export default function EditRole() {
  const { id } = useParams()
  const [roleName, setRoleName] = useState('Admin')
  const [status, setStatus] = useState('Active')
  const navigate = useNavigate()

  const handleEditRole = (e) => {
    e.preventDefault()
    
    editRole({name:roleName , status , id}).then((success)=>{
      if(success){
        navigate('/roles')
      }
    })  
  
  }

  useEffect(()=>{
      getRole(id).then((role)=>{
        setRoleName(role.name)
        setStatus(role.status)
      })
  },[])

  return (
    <div className="p-6 bg-white">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center mb-6">
          <Link to="/roles"><button className="mr-2">
            <img src={leftArrow} className="h-4 w-4" />
          </button></Link>
          <h1 className="text-2xl font-semibold">Edit Role</h1>
        </div>
        <form onSubmit={handleEditRole} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="roleName" className="text-sm font-medium text-gray-700">
              Role Name
            </label>
            <input
              id="roleName"
              value={roleName || ""}
              onChange={(e) => setRoleName(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded-md"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="status" className="text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              id="status"
              value={status || ""}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2"
            >
              <option value="" disabled>
                Select status
              </option>
              <option value="Active">
                Active
              </option>
              <option value="Inactive">
                Inactive
              </option>
            </select>
          </div>
          <div className="flex justify-end space-x-4 pt-4">
            <Link to="/roles">
            <button variant="outline" type="button">
              Cancle
            </button>
            </Link>
            <button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white p-1 rounded-lg px-2" >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}