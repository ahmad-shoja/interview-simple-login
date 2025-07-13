import { get } from '../index';
import { User } from '../types/auth';

export const getUser = async (): Promise<User> => {
    const response = await get('?results=1&nat=us');
    const user = response.results[0];
    return user;
}; 