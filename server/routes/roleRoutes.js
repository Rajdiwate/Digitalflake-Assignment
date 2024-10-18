import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { addRole, deleteRole, editRole, getRoles, getSingleRole } from "../controller/roleColtroller.js";

const router = Router();

router.route('/add-role').post(verifyJWT , addRole);

router.route('/get-roles').get(verifyJWT , getRoles)

router.route('/delete-role/:id').delete(verifyJWT , deleteRole)

router.route('/get-role/:id').get(verifyJWT , getSingleRole)

router.route('/update-role').put(verifyJWT , editRole )

export default router