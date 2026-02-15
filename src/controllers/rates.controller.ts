import { Request, Response } from 'express';
import { getOrCreateUser } from '../services/user.service';
import { getRates } from '../services/rates.service';

export async function getRatesController(req: Request, res: Response) {
    try {
        const userId = (req as any).userId;

        const user = await getOrCreateUser(userId);

        const base = (req.query.base as string) || user.base_currency;

        const targetsParam = req.query.targets as string;
        if (!targetsParam) {
            return res.status(400).json({
                error: 'Необходимо указать targets, например: ?targets=EUR,GBP',
            });
        }

        const targets = targetsParam.split(',');

        const rates = await getRates(userId, base, targets);

        res.json({
            base,
            rates,
        });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}
