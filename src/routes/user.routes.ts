import { Router } from 'express';
import {
    getUserSettings,
    updateUserSettings,
} from '../controllers/user.controller';

const router = Router();

router.get('/', getUserSettings);
router.post('/', updateUserSettings);

export default router;
