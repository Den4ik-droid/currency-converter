import { Request, Response } from 'express';
import axios from 'axios';
import { getOrCreateUser } from '../services/user.service';
import { getFromCache, saveToCache } from '../services/ratesCache.service';

export async function getRates(req: Request, res: Response) {
    try {
        const userId = (req as any).userId;

        //  Получаем или создаём пользователя
        const user = await getOrCreateUser(userId);

        //  Определяем базовую валюту
        const base = (req.query.base as string) || user.base_currency;

        //  Разбираем targets
        const targetsParam = req.query.targets as string;
        const targets = targetsParam ? targetsParam.split(',') : [];

        if (targets.length === 0) {
            return res.status(400).json({
                error: 'Необходимо указать targets, например: ?targets=EUR,GBP',
            });
        }

        //  Формируем ключ кэша
        const cacheKey = `${base}:${targets.join(',')}`;

        //  Проверяем кэш
        const cached = getFromCache(cacheKey);
        if (cached) {
            return res.json({
                base,
                date: cached.date,
                rates: cached.rates,
                cached: true,
            });
        }

        //  Если в кэше нет — делаем запрос к Frankfurter API
        const url = `https://api.frankfurter.app/latest?from=${base}&to=${targets.join(',')}`;
        const response = await axios.get(url);

        const data = response.data;

        //  Сохраняем в кэш
        saveToCache(cacheKey, data);

        //  Возвращаем реальные курсы
        res.json({
            base: data.base,
            date: data.date,
            rates: data.rates,
            cached: false,
        });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}
