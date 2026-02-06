import { Router } from 'express';
import { getOrCreateUser } from '../services/user.service';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const userId = (req as any).userId;

        const user = await getOrCreateUser(userId);

        res.json({
            user_id: user.user_id,
            base_currency: user.base_currency,
            favorites: user.favorites,
        });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const userId = (req as any).userId;

        const user = await getOrCreateUser(userId);

        res.json({
            user_id: user.user_id,
            base_currency: user.base_currency,
            favorites: user.favorites,
        });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

export default router;

import { updateUserSettings } from '../services/user.service';

router.post('/', async (req, res) => {
    try {
        const userId = (req as any).userId;

        const settings = req.body;

        const updated = await updateUserSettings(userId, settings);

        res.json(updated);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});
