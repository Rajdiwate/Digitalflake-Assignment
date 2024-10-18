import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'


const makeConfigurations = ()=>{
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_SECRET
    });
}

export const uploadToCloudinary = async (localPath) => {
    try {
       makeConfigurations();
        if(!localPath) return null
        const response = await cloudinary.uploader.upload(localPath , {resource_type : 'auto'})
        // console.log("File uploaded on cloudinary !" , response.url)
        fs.unlinkSync(localPath)
        return response
    } catch (error) {
        fs.unlinkSync(localPath) //remove the locally saved temporary file
        return null
    }
}

export const deleteCloudinary = async(public_id)=>{
    try {
        makeConfigurations();
        if(!public_id) return false;
        const response = await cloudinary.uploader.destroy(public_id , {resource_type : "image"})
        return true

    } catch (error) {
        return false;  
    }
}