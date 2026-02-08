import { Request, Response } from 'express';
import { getOrCreateUser, updateUserSettings } from '../services/user.service';

export async function getUserSettings(req: Request, res: Response) {
    const userId = (req as any).userId;
    const user = await getOrCreateUser(userId);
    res.json(user);
}

export async function updateUserSettingsController(
    req: Request,
    res: Response,
) {
    const userId = (req as any).userId;
    const updated = await updateUserSettings(userId, req.body);
    res.json(updated);
}
