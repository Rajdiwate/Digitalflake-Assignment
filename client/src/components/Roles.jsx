import React, { useContext, useEffect, useState } from 'react'
import down from "../assets/down.png"
import up from "../assets/up.png"
import edit from "../assets/edit.png"
import trash from "../assets/trash.png"
import search from "../assets/search.png"
import { deleteContext } from '../context/deleteContext'
import { getRoles } from '../api/roleApi'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Roles = () => {

  const deleteState = useContext(deleteContext)
  const [loading , setLoading] = useState(true)
  const [roles , setRoles] = useState([])
  const navigate = useNavigate()


  useEffect(()=>{
    getRoles().then((roles)=>{
      setRoles(roles)
    }).catch((e)=>{
      console.log(e)
      setRoles(null)
    }).finally(()=>{setLoading(false)})

  },[navigate ])
  
  if(loading) return <div>Loading...</div>

  return (
    <div className="p-6 bg-white flex-1">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold flex items-center gap-2 mr-10">
          <span className="p-2 bg-purple-100 rounded-full">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 4.75L19.25 9L12 13.25L4.75 9L12 4.75Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9.25 12L4.75 15L12 19.25L19.25 15L14.6722 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          Roles
        </h1>
        <div className="flex gap-4 flex-1 justify-between">
          <div className="relative">
            <img
              src={search}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              className="pl-10 pr-4 py-2 w-[30rem] border border-gray-300 rounded-xl"
            />
          </div>
          <Link to="/roles/add">
          <button className="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-lg">
            Add New
          </button>
          </Link>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse table-fixed">
          <thead>
            <tr className="bg-yellow-100">
              <th className="p-3 text-left font-semibold w-1/5">
                <button className="flex items-center justify-start w-full">
                  Id
                  <div className="flex flex-col mx-1 items-center justify-center">
                    <img src={up} className="w-2 h-2 ml-1 my-[1px]" />
                    <img src={down} className="w-2 h-2 ml-1 my-[1px]" />
                  </div>
                </button>
              </th>
              <th className="p-3 text-left font-semibold w-2/5">
                <button className="flex items-center justify-start w-full">
                  Role Name
                  <div className="flex flex-col mx-1 items-center justify-center">
                    <img src={up} className="w-2 h-2 ml-1 my-[1px]" />
                    <img src={down} className="w-2 h-2 ml-1 my-[1px]" />
                  </div>
                </button>
              </th>
              <th className="p-3 text-left font-semibold w-1/5">
                <button className="flex items-center  w-full justify-start">
                  Status
                  <div className="flex flex-col mx-1 items-center justify-center">
                    <img src={up} className="w-2 h-2 ml-1 my-[1px]" />
                    <img src={down} className="w-2 h-2 ml-1 my-[1px]" />
                  </div>
                </button>
              </th>
              <th className="p-3  font-semibold w-1/5 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role, index) => (
              <tr
                key={role.id}
                className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
              >
                <td className="p-3">{role.id}</td>
                <td className="p-3">{role.name}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${role.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                      }`}
                  >
                    {role.status}
                  </span>
                </td>
                <td className="p-3">
                  <div className="flex gap-2 justify-center">
                    <Link to={`/roles/edit/${role._id}`} ><button className="text-gray-600 hover:text-blue-600" >
                      <img src={edit} className="w-5 h-5" />
                    </button>
                    </Link>
                    <button
                      className="text-gray-600 hover:text-red-600"
                      onClick={() => {
                        deleteState.setDel(true)
                        deleteState.setIsUserDelete(false)
                        deleteState.setId(role._id)
                      }}
                    >
                      <img src={trash} className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Roles