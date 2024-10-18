import { User } from "../models/user.models.js";
import { ApiError } from "../utils/apiError.js"
import jwt from "jsonwebtoken"

export const verifyJWT = async(req,res,next)=>{
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer" , "");
        // console.log(req.cookies)
        if(!token){
            return next(new ApiError("Please Login to Access" ,401))
        }
        
        const decodedToken = jwt.verify(token.trim() , process.env.ACCESS_TOKEN_SECRET )
        
        const user = await User.findById(decodedToken?._id).select('-refershToken')

        if(!user){
            throw new ApiError("Access Token is Invalid or Expired", 401  )
        }

        req.user = user;
        next()

    } catch (error) {
        return new ApiError(error?.message || " Invalid Access Token" , 500 )
    }
}