import { supabase } from '../lib/supabase';

export async function getOrCreateUser(userId: string) {
    // Проверяем, есть ли пользователь
    const { data: existingUser, error: selectError } = await supabase
        .from('users')
        .select('*')
        .eq('user_id', userId)
        .single();

    if (selectError && selectError.code !== 'PGRST116') {
        throw new Error(
            'Ошибка при поиске пользователя: ' + selectError.message,
        );
    }

    // Если пользователь найден — возвращаем
    if (existingUser) {
        return existingUser;
    }

    // Создаём нового пользователя
    const { data: newUser, error: insertError } = await supabase
        .from('users')
        .insert({
            user_id: userId,
            base_currency: 'USD',
            favorites: [],
        })
        .select()
        .single();

    if (insertError) {
        throw new Error(
            'Ошибка при создании пользователя: ' + insertError.message,
        );
    }

    return newUser;
}

export async function updateUserSettings(userId: string, settings: any) {
    const { data, error } = await supabase
        .from('users')
        .update(settings)
        .eq('user_id', userId)
        .select()
        .single();

    if (error) {
        throw new Error('Ошибка при обновлении настроек: ' + error.message);
    }

    return data;
}
