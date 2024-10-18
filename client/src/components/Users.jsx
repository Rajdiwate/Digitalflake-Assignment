import React, { useContext, useEffect, useState } from 'react'
import down from "../assets/down.png"
import up from "../assets/up.png"
import edit from "../assets/edit.png"
import trash from "../assets/trash.png"
import user from '../assets/user.png'
import search from "../assets/search.png"
import avatar from "../assets/avatar.png"
import { deleteContext } from '../context/deleteContext'
import { Link, useNavigate } from 'react-router-dom'
import { getAllUsers } from '../api/userApi'
import { getRole } from '../api/roleApi'


const Users = () => {
  const deleteState  = useContext(deleteContext)
  const [searchContent , setSearchContent] = useState("")
  const [loading , setLoading] = useState(true)
  const [users , setUsers] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    setLoading(true);
    getAllUsers()
      .then(async (users) => {
        
        setUsers(users);
      })
      .catch((e) => {
        console.error(e);
        setUsers(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [navigate ]);

  if(loading) return <div>Loading...</div>
        return (
          <div className="p-6 bg-white flex-1">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-semibold flex items-center gap-2 mr-10">
                <img src={user} alt="" />
                User
              </h1>
              <div className="flex gap-4 flex-1 justify-between">
                <form className="relative">
                  <img src={search} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input type="text"  className="pl-10 pr-4 py-2 w-[30rem] border border-gray-300 rounded-xl " onChange={(e)=>{setSearchContent(e.target.value)}} />
                </form>
                <Link to="/user/add">
                <button className="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-lg">
                  Add New
                </button>
                </Link>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-yellow-100">
                    <th className="p-3 text-left font-semibold">
                      <button className="flex items-center">
                        Id
                        <div className='flex flex-col mx-1 items-center justify-center '>
                        <img src={up} className="w-2 h-2 ml-1 my-[1px]" />
                        <img src={down} className="w-2 h-2 ml-1 my-[1px]" />
                        </div>
                      </button>
                    </th>
                    <th className="p-3 text-left font-semibold">
                      <button className="flex items-center">
                        Name
                        <div className='flex flex-col mx-1 items-center justify-center '>
                        <img src={up} className="w-2 h-2 ml-1 my-[1px]" />
                        <img src={down} className="w-2 h-2 ml-1 my-[1px]" />
                        </div>
                      </button>
                    </th>
                    <th className="p-3 text-left font-semibold">
                      <button className="flex items-center">
                        Mobile
                        <div className='flex flex-col mx-1 items-center justify-center '>
                        <img src={up} className="w-2 h-2 ml-1 my-[1px]" />
                        <img src={down} className="w-2 h-2 ml-1 my-[1px]" />
                        </div>
                      </button>
                    </th>
                    <th className="p-3 text-left font-semibold">
                      <button className="flex items-center">
                        Email-Id
                        <div className='flex flex-col mx-1 items-center justify-center '>
                        <img src={up} className="w-2 h-2 ml-1 my-[1px]" />
                        <img src={down} className="w-2 h-2 ml-1 my-[1px]" />
                        </div>
                      </button>
                    </th>
                    <th className="p-3 text-left font-semibold">
                      <button className="flex items-center">
                        Role <img src={avatar} className='mx-1 h-6'/>
                        
                      </button>
                    </th>
                    <th className="p-3 text-left font-semibold">
                      <button className="flex items-center">
                        Status
                        <div className='flex flex-col mx-1 items-center justify-center '>
                        <img src={up} className="w-2 h-2 ml-1 my-[1px]" />
                        <img src={down} className="w-2 h-2 ml-1 my-[1px]" />
                        </div>
                      </button>
                    </th>
                    <th className="p-3 text-left font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={user.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="p-3">{user.userId}</td>
                      <td className="p-3">{user.name}</td>
                      <td className="p-3">{user.mobile? user.mobile : "NA"}</td>
                      <td className="p-3">{user.email}</td>
                      <td className="p-3">{user.role}</td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="p-3">
                        <div className="flex gap-2">
                          <Link to={`/user/edit/${user._id}`}>
                          <button className="text-gray-600 hover:text-blue-600">
                            <img src={edit} className="w-5 h-5"  />
                          </button></Link>
                          <button className="text-gray-600 hover:text-red-600">
                            <img src={trash} className="w-5 h-5" onClick={()=>{deleteState.setDel(true); deleteState.setIsUserDelete(true); deleteState.setId(user._id)}} />
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

export default Users