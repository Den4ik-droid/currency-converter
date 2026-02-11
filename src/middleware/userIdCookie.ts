import { Request, Response, NextFunction } from 'express';
import { v4 as uuid } from 'uuid';
import { getOrCreateUser } from '../services/user.service';

export async function userIdCookie(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    let userId = req.cookies?.user_id;

    // Если куки нет — создаём новую
    if (!userId) {
        userId = uuid();

        // Устанавливаем куку вручную через Set-Cookie
        res.setHeader(
            'Set-Cookie',
            `user_id=${userId}; HttpOnly; Path=/; Max-Age=31536000; SameSite=Lax`,
        );
    }

    // Создаём пользователя, если его нет
    await getOrCreateUser(userId);

    // Прокидываем userId в req
    (req as any).userId = userId;

    next();
}
