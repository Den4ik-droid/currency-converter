import axios from 'axios';
import { getFromCache, saveToCache } from './ratesCache.service';
import { getRatesFromDB, saveRatesToDB } from './ratesDbCache.service';

export async function getRates(
    userId: string,
    base: string,
    targets: string[],
) {
    const key = `${userId}_${base}_${targets.join(',')}`;

    // Проверяем кэш в памяти (5 минут)
    const memoryCached = getFromCache(key);
    if (memoryCached) {
        return memoryCached;
    }

    // Проверяем кэш в БД (24 часа)
    const dbResults: Record<string, any> = {};

    let allFoundInDB = true;

    for (const target of targets) {
        const cached = await getRatesFromDB(base, target);
        if (!cached) {
            allFoundInDB = false;
            break;
        }
        dbResults[target] = cached;
    }

    if (allFoundInDB) {
        saveToCache(key, dbResults);
        return dbResults;
    }

    // Запрашиваем Frankfurter API
    const response = await axios.get(
        `https://api.frankfurter.app/latest?base=${base}&symbols=${targets.join(',')}`,
    );

    const rates = response.data.rates;

    // Сохраняем в БД
    for (const target of Object.keys(rates)) {
        await saveRatesToDB(base, target, rates[target]);
    }

    // Сохраняем в память
    saveToCache(key, rates);

    return rates;
}
