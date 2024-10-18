import { useContext } from "react"
import deleteAlert from "../assets/delete-alert.png"
import { deleteContext } from "../context/deleteContext"
import { deleteUser } from "../api/userApi"
import { deleteRole } from "../api/roleApi"
import { useNavigate } from "react-router-dom"

export default function DeleteConfirmation() {

  const deleteState = useContext(deleteContext)
  const navigate = useNavigate()
  

  const handleDelete = async () => {
    if (deleteState.isUserDelete) {
      deleteUser(deleteState.id).then((res) => {
        if (res) {
          deleteState.setDel(false)
          navigate('/temporary');
          navigate('/users')
        }
      })
    }
    else {
      deleteRole(deleteState.id).then((res) => {
        if (res) {
          deleteState.setDel(false)
          navigate('/temporary');
          navigate('/roles')
        }
      })
    }
  }

  return (

    <div className="w-full max-w-sm mx-auto  p-6 bg-white">
      <div className="flex flex-row items-center gap-4 justify-center mb-4">
        <img src={deleteAlert} alt="alert" className="h-6 w-6" />
        <div className="text-xl font-semibold">Delete</div>
      </div>

      <div className="text-center mb-6">
        <p className="text-gray-500">Are you sure you want to delete?</p>
      </div>

      <div className="flex justify-center gap-4 mt-6">
        <button className="bg-gray-300 rounded-lg p-2" onClick={() => { deleteState.setDel(false) }}>Cancel</button>
        <button className="bg-[#5C218B] hover:bg-purple-800 rounded-lg p-2 text-white" onClick={handleDelete}>Confirm</button>
      </div>
    </div>


  )
}