import { Role } from "../models/role.model.js";
import { ApiError } from "../utils/apiError.js";

// Secured
const getRoles = async (req, res, next) => {
    try {
        const roles = await Role.find();
        return res.status(200).json({success : true,   roles })
    } catch (error) {
        return next(new ApiErrorError(error.message, 500));
    }
}

const addRole = async (req, res, next) => {
    try {
        const { name , status } = req.body
        if (!name || !status) return next(new ApiError("No role recieved", 400));

        const dbRole = await Role.create({ name ,status });
        if (!dbRole) return next(new ApiError("something went wrong while creating role", 500));

        return res.status(201).json({ success: true, message: "Role added successfully" })
    } catch (error) {
        return next(new ApiError(error.message, 500));
    }
}

const deleteRole = async (req, res, next) => {
    try {
        const id = req.params.id
        
        if (!id) return next(new ApiError("No such role Exists", 400))
        const role = await Role.findByIdAndDelete(id);
        if (!role) return next(new ApiError("No such role Exists", 400))

        return res.status(200).json({ success: true, message: "Role Deleted Successfully" });

    } catch (error) {
        return next(new ApiErrorError(error.message, 500));
    }
}

const getSingleRole = async(req,res,next)=>{
    try {
        const id = req.params.id;
        // console.log("rol_id" , id)
        if(!id) return next(new ApiError("No such role Exists", 404))
        const role = await Role.findById(id);
        if (!role) return next(new ApiError("No such role Exists", 404))
        return res.status(200).json({ success: true, role});
    } catch (error) {
        return next(new ApiError(error.message, 500));
    }
}


const editRole = async(req,res,next)=>{
    try {
        const {name , status , id} = req.body
        if(!name || !status || !id) {
            return next(new ApiError("Incomplete Details", 400))
        }

        const role = await Role.findByIdAndUpdate(id , {name , status});
        if(!role){
            return next(new ApiError("invalid id", 400))
        }
        return res.status(200).json({success : true , role})
    } catch (error) {
        return next(new ApiError(error.message, 500));
    }
}
export { addRole, getRoles, deleteRole ,getSingleRole  ,editRole}