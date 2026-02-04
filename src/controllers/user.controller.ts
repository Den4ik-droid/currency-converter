import { Request, Response } from 'express';
import { getUserById, updateUser } from '../services/user.service';

export async function getUserSettings(req: Request, res: Response) {
    const userId = (req as any).userId;
    const user = await getUserById(userId);
    res.json(user);
}

export async function updateUserSettings(req: Request, res: Response) {
    const userId = (req as any).userId;
    const updated = await updateUser(userId, req.body);
    res.json(updated);
}
