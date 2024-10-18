import axios from "axios"

const endpoint = import.meta.env.VITE_API_ENDPOINT

const getRoles = async()=>{
    try {
        const res = await axios.get(`${endpoint}/api/get-roles` , {withCredentials:true});
        return res.data.roles
    } catch (error) {
        return null
    }
}

const getRole = async(id)=>{
    try {
        const res = await axios.get(`${endpoint}/api/get-role/${id}` , {withCredentials:true})
        console.log("role:" ,res.data.role )
        return res.data.role;
    } catch (error) {
        return null
    }
}

const deleteRole = async(id)=>{
    try {
        const res = await axios.delete(`${endpoint}/api/delete-role/${id}` , {withCredentials:true})
        if(res.data.success){
            return true
        }
        return false
    } catch (error) {
        return false
    }
}

const editRole = async ({name , status , id})=>{
    try {
        const res = await axios.put(`${endpoint}/api/update-role` , {name , status , id} , {withCredentials:true})

        if(res.data.success){
            return true
        }
        return false

    } catch (error) {
        return false
    }
}

const addRole = async(name)=>{
    try {
        const res = await axios.post(`${endpoint}/api/add-role` , {name , status:"Active"} , {withCredentials:true})
        if(res.data.success){
            return true
        }
        return false
    } catch (error) {
        return false
    }
}
export {getRoles , getRole , deleteRole , editRole ,addRole}