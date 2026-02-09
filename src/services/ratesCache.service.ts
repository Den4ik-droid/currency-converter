// Кэш в памяти на 5 минут
const memoryCache: Record<string, { data: any; expires: number }> = {};

const TTL = 5 * 60 * 1000;

export function getFromCache(key: string) {
    const entry = memoryCache[key];

    if (!entry) return null;

    // Проверяем, не истёк ли срок
    if (entry.expires < Date.now()) {
        delete memoryCache[key];
        return null;
    }

    return entry.data;
}

export function saveToCache(key: string, data: any) {
    memoryCache[key] = {
        data,
        expires: Date.now() + TTL,
    };
}
