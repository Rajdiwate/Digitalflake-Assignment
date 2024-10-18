import { Router } from "express";
import { loginUser, registerUser, logoutUser, forgotPassword, resetPassword, getCurrentUser, updateProfile, getAllUsers, getDetails , deleteUser, addUser } from "../controller/userController.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router();

router.route('/register').post( registerUser) 

router.route('/add-user').post(verifyJWT ,upload.single('avatar'), addUser)

router.route('/update-profile').put(verifyJWT ,upload.single('avatar'), updateProfile)

router.route('/login').post(loginUser)

router.route('/password/forgot').post(forgotPassword)

router.route('/password/reset/:token').put(resetPassword)

router.route('/logout').get(verifyJWT, logoutUser)

router.route('/me').get(verifyJWT, getCurrentUser)

router.route('/admin/users').get(verifyJWT,  getAllUsers)
router.route('/admin/delete-user/:id').delete(verifyJWT ,  deleteUser)

router.route('/admin/user/:id').get(verifyJWT,  getDetails)
    

export default router