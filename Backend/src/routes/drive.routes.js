import express from 'express';
import { getDrives, addDrive, applyToDrive } from '../controllers/drives.controller.js';
import authenticateUser from '../middlewares/authenticate.middleware.js';
import isCoordinator from '../middlewares/isCoorinator.middleware.js';

const router = express.Router();

router.route('/drives').get(
    getDrives,
)

router.route('/add-drive').post(
    authenticateUser,
    isCoordinator,
    addDrive
)

router.route('/:driveId/apply').post(
    authenticateUser,
    applyToDrive,
)

export default router;