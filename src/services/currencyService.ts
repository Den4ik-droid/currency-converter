import axios from 'axios';

let cachedCurrencies: any = null;
let cacheTimestamp: number | null = null;

const CACHE_TTL = 60 * 60 * 1000; // 1 час

export async function getCurrencies() {
    const now = Date.now();

    if (
        cachedCurrencies &&
        cacheTimestamp &&
        now - cacheTimestamp < CACHE_TTL
    ) {
        return cachedCurrencies;
    }

    // Новый API
    const response = await axios.get('https://api.frankfurter.app/currencies');

    const data = response.data;

    if (!data || typeof data !== 'object') {
        throw new Error('Не удалось получить список валют');
    }

    cachedCurrencies = data;
    cacheTimestamp = now;

    return data;
}
