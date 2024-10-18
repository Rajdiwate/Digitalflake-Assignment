import { User } from "../models/user.models.js"
import { ApiError } from "../utils/apiError.js"
import sendEmail from "../utils/sendEmail.js"
import crypto from "crypto"
import { deleteCloudinary, uploadToCloudinary } from "../utils/cloudinary.js"
import fs from 'fs'


//generate Access and Refresh Tokens
const generateTokens = async (userId) => {
    try {
        const user = await User.findById(userId);
        const AT = await user.generateAccessToken();
        const RT = await user.generateRefreshToken();
        user.refreshToken = RT
        await user.save({ validateBeforeSave: false })
        return { AT, RT }
    } catch (error) {
        throw new ApiError("something went Wrong while generating tokens", 500)
    }
}

//Register a user
const registerUser = async (req, res, next) => {
    try {

        const { name, email, password, mobile, role } = req.body

        // Check if name, email, and password are provided
        if (!name || !email || !password) {
            return next(new ApiError("Incomplete Details", 400));
        }

        // Check if a user with this email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return next(new ApiError("User with this email already exists", 400));
        }

        // Create a new user
        const user = await User.create({ name, email, password, mobile, role });

        // Select the user without password and refreshToken fields
        const createdUser = await User.findById(user._id).select("-password -refreshToken");
        if (!createdUser) {
            return next(new ApiError("Something went wrong while creating user", 500));
        }

        // Generate access and refresh tokens
        const { AT, RT } = await generateTokens(user._id);

        // Cookie options for accessToken and refreshToken
        const cookieOptions = {
            expires: new Date(Date.now() + Number(process.env.COOKIE_EXPIRE) * 24 * 60 * 60 * 1000),
            httpOnly: true,
            // secure: true  // Uncomment for secure HTTPS environments
        };

        // Return response with tokens in cookies and the created user
        return res.status(201).cookie("accessToken", AT, cookieOptions).cookie("refreshToken", RT, cookieOptions).json({ success: true, createdUser })

    } catch (error) {
        return next(new ApiError(error.message, 500));  // Handle the error with a 500 status
    }
};

//add User
const addUser = async (req, res, next) => {
    try {
        
      const { name, mobile, email, role } = req.body;
      let avatarLocalPath = null;
        
      // If there's a file (avatar), store its path
      if (req.file) {
        avatarLocalPath = req.file.path;
      }
      
      // Check if required fields are missing
      if (!name || !email || !mobile || !role) {
        return next(new ApiError("Incomplete Details", 400));
      }
      
      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      
      if (existingUser) {
        console.log("existing" , existingUser)
        if (avatarLocalPath) fs.unlinkSync(avatarLocalPath); // Delete the local avatar file if it exists
        return next(new ApiError("User with this email already exists", 400));
      }
      
      let user = null;
  
      // If avatar exists, upload to Cloudinary and create user with avatar details
      if (avatarLocalPath) {
        
        const avatarInstance = await uploadToCloudinary(avatarLocalPath);
        try {
          user = await User.create({
            name,
            email,
            role,
            mobile,
            avatar: {
              public_id: avatarInstance.public_id,
              url: avatarInstance.url,
            },
          });
        
          // Delete the local file after uploading to Cloudinary
        //   fs.unlinkSync(avatarLocalPath);  //the file is already unsynced in line 99
        } catch (error) {
          // Handle Cloudinary deletion in case of an error
          const avatarId = avatarInstance?.public_id;
          await deleteCloudinary(avatarId);
          return next(new ApiError(error.message, 400));
        }
      } else {
        // Create user without avatar if no file is provided
        user = await User.create({ name, email, role, mobile });
      }
      
      // Fetch the created user without sensitive info
      const createdUser = await User.findById(user._id);
      if (!createdUser) {
        return next(new ApiError("Something went wrong while creating the user", 500));
      }
  
      // Return the created user in response
      return res.status(201).json({ success: true, user: createdUser });
  
    } catch (error) {
      return next(new ApiError(error.message, 500));
    }
  };

//Login
const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return next(new ApiError("Email and password is Required", 400))
        }

        const user = await User.findOne({ email: email })

        if (!user) return next(new ApiError("No user exists with the given email", 400))

        const isCorrectPassword = await user.isPasswordCorrect(password)
        if (!isCorrectPassword) {
            return next(new ApiError("Invalid Password", 400))

        }

        const { AT, RT } = await generateTokens(user._id)
        const options = {
            maxAge: new Date(Date.now() + (process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000)),
            httpOnly: true,
            // secure: true
        }

        const userObject = user.toObject();
        delete userObject.password;

        return res.status(200).cookie("accessToken", AT, options).cookie("refreshToken", RT, options).json({ success: true, userObject })

    } catch (error) {
        return next(new ApiError(error.message, 500))
    }
}

//Logout
const logoutUser = async (req, res, next) => {
    try {
        const userId = req.user._id;
        await User.findByIdAndUpdate(userId, {
            $set: { refreshToken: undefined }
        })

        const options = {
            expires: new Date(0),
            httpOnly: true,
            // secure: true
        }
        res.status(200)
            .clearCookie("accessToken", null, options)
            .clearCookie("refreshToken", null, options)
            .json({ success: true, message: "user logged out" })
    } catch (error) {
        return next(new ApiError(error.message, 400))
    }
}

//forgot Password
const forgotPassword = async (req, res, next) => {
    try {
        //get the user who wants to change the password
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            return next(new ApiError("user not found", 404));
        }

        //get reset Password Token
        const resetToken = await user.getResetPasswordToken();

        await user.save({ validateBeforeSave: false });

        const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`

        const message = `Your Password Reset Token is :- \n\n ${resetPasswordUrl} \n\n If you have not requested this email then, please ignore it`

        try {

            await sendEmail({
                email: user.email,
                subject: `Digitalflake Password Recovery`,
                message
            })


            res.status(200).json({ success: true, message: `Email sent to ${user.email} successfully` })
        } catch (error) {
            user.resetPasswordToken = undefined
            user.resetPasswordExpiry = undefined
            await user.save()
            return next(new ApiError(error.message, 500))
        }

    } catch (error) {
        next(new ApiError(error.message, 500));
    }
}

//reset Pasword
const resetPassword = async (req, res, next) => {
    try {
        //creating token hash
        const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex")
        //search user using hased token

        const user = await User.findOne({
            resetPasswordToken: resetPasswordToken,
            resetPasswordExpiry: { $gt: Date.now() }
        })
        if (!user) {
            return next(new ApiError("Reset Password Token is Invalid or has been Expired", 404))
        }

        if (req.body.password !== req.body.confirmPassword) {
            return next(new ApiError("password dosent match", 400))
        }
        user.password = req.body.password
        user.resetPasswordToken = undefined
        user.resetPasswordExpiry = undefined
        await user.save();

        //login User
        const { AT, RT } = await generateTokens(user._id)
        const options = {
            maxAge: new Date(Date.now() + (process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000)),
            httpOnly: true,
            // secure: true
        }

        const userObject = user.toObject();
        delete userObject.password;

        return res.status(200).cookie("accessToken", AT, options).cookie("refreshToken", RT, options).json({ success: true, userObject })


    } catch (error) {
        next(new ApiError(error.message, 500))
    }
}

//get user details
const getCurrentUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id).select("-password -refreshToken")
        return res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        return next(new ApiError(error.message, 500))
    }
}

//update user details
const updateProfile = async (req, res, next) => {
    try {
        console.log("hello")
        const { name, mobile, email, role } = req.body;
        let avatarLocalPath = null;
          
        // If there's a file (avatar), store its path
        if (req.file) {
          avatarLocalPath = req.file.path;
        }
        
        // Check if required fields are missing
        if (!name || !email || !mobile || !role) {
          return next(new ApiError("Incomplete Details", 400));
        }
        
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        
        if (!existingUser) {
          return next(new ApiError("User with this email does not exists", 400));
        }
        
        let user = null;
    
        // If avatar exists, upload to Cloudinary and create user with avatar details
        if (avatarLocalPath) {
            await deleteCloudinary(existingUser.avatar.public_id);
          const avatarInstance = await uploadToCloudinary(avatarLocalPath);
          try {
            user = await User.findByIdAndUpdate(existingUser._id,  {
              name,
              email,
              role,
              mobile,
              avatar: {
                public_id: avatarInstance.public_id,
                url: avatarInstance.url,
              },
            });
          
          } catch (error) {
            // Handle Cloudinary deletion in case of an error
            const avatarId = avatarInstance?.public_id;
            await deleteCloudinary(avatarId);
            return next(new ApiError(error.message, 400));
          }
        } else {
          // Create user without avatar if no file is provided
          user = await User.findByIdAndUpdate( existingUser._id,{ name, email, role, mobile });
        }
        
        // Fetch the created user without sensitive info
        
        if (!user) {
          return next(new ApiError("Something went wrong while creating the user", 500));
        }
    
        // Return the created user in response
        return res.status(201).json({ success: true, user });
    
      } catch (error) {
        return next(new ApiError(error.message, 500));
      }
};

//Get All Users (Admin)
const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json({ success: true, users });

    } catch (error) {
        return next(new ApiError(error.message, 500))
    }
}

// Get Single User  (Admin)
const getDetails = async (req, res, next) => {
    try {
        const id = req.params.id
        const user = await User.findById(id).select("-password -refreshToken");
        if (!user) {
            return next(new ApiError("No user Found", 400))
        }

        return res.status(200).json({
            success: true,
            user,
        })

    } catch (error) {
        return next(new ApiError(error.message, 500))
    }
}

// Delete User (Admin)
const deleteUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) {
            return next(new ApiError("No user Exists", 400))
        }

        // await deleteCloudinary(user.avatar?.public_id);
        const temp = await User.findOneAndDelete({ _id: req.params.id })

        return res.status(200).json({ success: true, message: "User deleted Successfully" })

    } catch (error) {
        return next(new ApiError(error.message, 500))
    }
}

export { registerUser, loginUser, logoutUser,  forgotPassword, resetPassword, getCurrentUser, updateProfile, getAllUsers, getDetails,  deleteUser, addUser }