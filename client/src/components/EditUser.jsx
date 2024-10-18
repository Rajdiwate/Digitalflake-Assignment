
import { useEffect, useState } from 'react'
import leftArrow from "../assets/leftArrow.png"
import { Link, useNavigate, useParams } from 'react-router-dom'
import uploadIcon from "../assets/upload.png"
import avatar2 from "../assets/avatar2.png"
import { getUserById, updateUser } from '../api/userApi'
import { getRoles } from '../api/roleApi'

export default function EditUser() {
  const [name, setName] = useState('Ramesh')
  const [mobile, setMobile] = useState('8756453402')
  const [email, setEmail] = useState('ramesh@gmail.com')
  const [role, setRole] = useState('Admin')
  const [status, setStatus] = useState('Active')
  const [avatar, setAvatar] = useState(null)
  const [roles , setRoles] = useState([]);
  const navigate = useNavigate()
  const {id} = useParams()

  const handleSubmit = (e) => {
    e.preventDefault()
    updateUser({ name, mobile, email, role, status, avatar }).then((success)=>{
      if(success)  navigate('/users')
    })
  }

  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.onloadend = () => {
        setImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  useEffect(()=>{
    //get the user
    getUserById(id).then((user)=>{
      if(user) {
        setName(user.name)
        setMobile(user.mobile)
        setEmail(user.email)
        setRole(user.role)
        setStatus(user.status)
        if(user.avatar) setAvatar(user.avatar.url)
      }
    })

    //get all ROles
    getRoles().then((roles)=>{
      if(roles) setRoles(roles)
    })

  },[])

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="flex-grow p-6">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center mb-6">
            <Link to="/users">
              <button type="button" className="mr-2">
                <img src={leftArrow} alt="Back" className="h-4 w-4" />
              </button>
            </Link>
            <h1 className="text-2xl font-semibold">Edit User</h1>
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
                >
                  <option value="" disabled>Select role</option>
                  {roles.map((role)=>(
                    <option key={role.id} value={role.name}>{role.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex items-start space-x-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Upload Image
                </label>
                <div className="flex items-center space-x-4">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
                    {avatar? (
                      <img
                        src={avatar}
                        alt="User"
                        className="w-full h-full object-cover"
                      />
                    ) :
                    <img
                        src={avatar2}
                        alt="Default Image"
                        className="w-full h-full object-cover"
                      />
                      }
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
              <div className="space-y-2">
                <label htmlFor="status" className="text-sm font-medium text-gray-700">
                  Status
                </label>
                <select
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2"
                >
                  <option value="" disabled>Select status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="border-t border-gray-200">
        <div className="max-w-2xl mx-auto p-6">
          <div className="flex justify-end space-x-4">
            <Link to="/users">
              <button type="button" className="border border-gray-300 px-4 py-2 rounded-md">
                Cancel
              </button>
            </Link>
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