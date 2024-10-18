import axios from "axios"

const endpoint = import.meta.env.VITE_API_ENDPOINT


const registerUser = async({name , email , password})=>{
    try {
        const res = await axios.post(`${endpoint}/api/register` , {name , email , password})
        return res.data.success
    } catch (error) {
        return false
    }
}

const getUser = async () => {
    try {
        const user = await axios.get(`${endpoint}/api/me`, { withCredentials: true })
        return user
    } catch (error) {
        return null
    }
}

const loginUser = async (email, password) => {
    try {
        const response = await axios.post(`${endpoint}/api/login`, { email, password }, { withCredentials: true })
        return response.data.success
        //res.data.userObject
    } catch (error) {
        return false
    }
}

const logout = async () => {
    try {
        const res = await axios.get(`${endpoint}/api/logout`, { withCredentials: true })
        return res?.data?.success
    } catch (error) {
        return false
    }
}

const forgetPassword = async (email) => {
    try {
        const res = await axios.post(`${endpoint}/api/password/forgot`, { email }, { withCredentials: true })
        return res.data.success
    } catch (error) {
        return false
    }
}

const getAllUsers = async () => {
    try {
        const res = await axios.get(`${endpoint}/api/admin/users`, { withCredentials: true });
        console.log(res.data.users);
        return res.data.users

    } catch (error) {
        return null
    }
}

const deleteUser = async (id) => {
    try {
        const res = await axios.delete(`${endpoint}/api/admin/delete-user/${id}`, { withCredentials: true });
        console.log("res", res)
        if (res.data.success) {
            return true
        }
        return false
    } catch (error) {
        return false
    }
}

const addUser = async ({ name, mobile, email, role, avatar }) => {
    try {
        const formData = new FormData();

        // Append fields to the FormData
        formData.append('name', name);
        formData.append('mobile', mobile);
        formData.append('email', email);
        formData.append('role', role);

        // Check the file object (avatar) and append it to FormData
        if (avatar) {
            console.log('Avatar:', avatar); // Log to check if it's a valid file object
            formData.append('avatar', avatar);
        }

        const res = await axios.post(`${endpoint}/api/add-user`, formData, {
            withCredentials: true,
            headers: {
                'Content-Type': 'multipart/form-data',  // Set the content type to multipart/form-data
            },
        });

        if (res.data.success) return true;
        return false;

    } catch (error) {
        console.error('Error adding user:', error);
        return false;
    }
};

const getUserById = async (id)=>{
    try {
    const res = await axios.get(`${endpoint}/api/admin/user/${id}` , {withCredentials:true})
    return res.data.user
    } catch (error) {
        return null
    }
}

const updateUser = async({ name, mobile, email, role, avatar })=>{
    try {
        const formData = new FormData();

        // Append fields to the FormData
        formData.append('name', name);
        formData.append('mobile', mobile);
        formData.append('email', email);
        formData.append('role', role);

        // Check the file object (avatar) and append it to FormData
        if (avatar) {
            console.log('Avatar:', avatar); // Log to check if it's a valid file object
            formData.append('avatar', avatar);
        }
        
        const res = await axios.put(`${endpoint}/api/update-profile`, formData, {
            withCredentials: true,
            headers: {
                'Content-Type': 'multipart/form-data',  // Set the content type to multipart/form-data
            },
        });

        if (res.data.success) return true;
        return false;
    } catch (error) {
        console.log(error)
        return false
    }
}


export { getUser, loginUser, logout, forgetPassword, getAllUsers, deleteUser, addUser,getUserById,updateUser,registerUser }