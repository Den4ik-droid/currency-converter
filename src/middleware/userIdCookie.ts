import { Request, Response, NextFunction } from 'express';
import { v4 as uuid } from 'uuid';
import { getOrCreateUser } from '../services/user.service';

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
            secure: false,
        });
    }

    // Создаём пользователя, если его нет
    await getOrCreateUser(userId);

    // Прокидываем userId в req
    (req as any).userId = userId;

    next();
}
