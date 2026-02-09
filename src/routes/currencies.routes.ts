import { Router } from 'express';
import { getCurrencies } from '../services/currency.service';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const currencies = await getCurrencies();
        res.json(currencies);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
