// временное хранилище до подключения БД
const users = new Map<string, any>();

export async function createUserIfNotExists(userId: string) {
    if (!users.has(userId)) {
        users.set(userId, {
            user_id: userId,
            base_currency: 'USD',
            favorites: [],
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        });
    }
}

export async function getUserById(userId: string) {
    return users.get(userId);
}

export async function updateUser(userId: string, data: any) {
    const user = users.get(userId);

    if (!user) return null;

    const updated = {
        ...user,
        ...data,
        updated_at: new Date().toISOString(),
    };

    users.set(userId, updated);
    return updated;
}
