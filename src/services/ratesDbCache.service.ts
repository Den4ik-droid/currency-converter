import { supabase } from '../lib/supabase';

const DB_TTL = 24 * 60 * 60 * 1000; // 24 часа

// Проверяем, свежие ли данные
function isFresh(updatedAt: string): boolean {
    const updated = new Date(updatedAt).getTime();
    return Date.now() - updated < DB_TTL;
}

// Получить данные из БД
export async function getRatesFromDB(base: string, target: string) {
    const { data, error } = await supabase
        .from('rates_cache')
        .select('*')
        .eq('base', base)
        .eq('target', target)
        .single();

    if (error || !data) return null;

    if (!isFresh(data.updated_at)) return null;

    return data.data; // JSON с курсами
}

// Сохранить данные в БД
export async function saveRatesToDB(base: string, target: string, rates: any) {
    const { error } = await supabase.from('rates_cache').upsert({
        base,
        target,
        data: rates,
        updated_at: new Date().toISOString(),
    });

    if (error) {
        console.error('Ошибка сохранения в БД:', error);
    }
}
