import { Request, Response, NextFunction } from 'express';
import { v4 as uuid } from 'uuid';
import { createUserIfNotExists } from '../services/user.service';

export async function userIdCookie(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    let userId = req.cookies.user_id;

    if (!userId) {
        userId = uuid();

        res.cookie('user_id', userId, {
            httpOnly: true,
            sameSite: 'lax',
            secure: false, // можно сделать true, если HTTPS
        });

        await createUserIfNotExists(userId);
    }

    // прокидываем userId в req для удобства
    (req as any).userId = userId;

    next();
}
