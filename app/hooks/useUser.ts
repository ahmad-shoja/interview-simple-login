import { useState } from 'react';
import { User } from '../api/types/auth';
import { USER_KEY } from '../constants';
import { toast } from '../components/Toast';
import { getUser } from '../api/requests/auth';

function getUserFromLocalStorage(): User | null {
    const userStr = localStorage.getItem(USER_KEY);
    if (!userStr) return null;
    try {
        return JSON.parse(userStr) as User;
    } catch {
        return null;
    }
}

function setUserToLocalStorage(user: User) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
}

function removeUserFromLocalStorage() {
    localStorage.removeItem(USER_KEY);
}

export function useUser() {
    const [user, setUser] = useState<User | null>(() => getUserFromLocalStorage());

    const login = async (): Promise<User> => new Promise<User>(async (resolve, reject) => {
        const userData = await getUser()
        if (!userData) {
            toast.error("User not found!")
            reject(null)
        }
        setUserToLocalStorage(userData);
        setUser(userData);
        resolve(userData)
    })

    const logout = () => {
        removeUserFromLocalStorage();
        setUser(null);
    };



    return {
        user,
        login,
        logout,
    };
}
