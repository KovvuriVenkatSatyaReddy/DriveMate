import { Router } from "express";
import { registerUser, loginUser ,updateUserProfile ,logoutUser, changeCurrentPassword, generateAccessAndRefreshTokens, getCurrentUser, refreshAccessToken, getAllUsers, getUserDetails, promoteUser, demoteUser, banUser, unBanUser, getUserInfo } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import authenticateUser, { verifyToken } from "../middlewares/authenticate.middleware.js";
import isAdmin from "../middlewares/isAdmin.middleware.js"
const router = Router();

router.route('/register').post(
    registerUser
)

router.route('/login').post(
    loginUser
);

router.route('/logout').post(
    logoutUser
);

router.route('/update').post(
    authenticateUser,
    updateUserProfile
);

router.route('/promote').post(
    authenticateUser,
    isAdmin,
    promoteUser
);

router.route('/demote').post(
    authenticateUser,
    isAdmin,
    demoteUser
);

router.route('/ban').post(
    authenticateUser,
    isAdmin,
    banUser
);

router.route('/unban').post(
    authenticateUser,
    isAdmin,
    unBanUser
);

router.route('/all-users').get(
    getAllUsers
);

router.route('/all-details/:id').get(
    authenticateUser,
    getUserDetails
);

router.route('/user-info').get(
    authenticateUser,
    getUserInfo
);

router.route('/refresh').post(
    refreshAccessToken
)

export default router