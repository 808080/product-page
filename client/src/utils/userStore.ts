const USER_STORAGE_NAME = 'userId';

export const getUserId = () => localStorage.getItem(USER_STORAGE_NAME);
export const setUserId = (val: string) => localStorage.setItem(USER_STORAGE_NAME, val);
export const removeUserId = () => localStorage.removeItem(USER_STORAGE_NAME);