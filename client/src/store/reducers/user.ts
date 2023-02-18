import { UserDAO } from "../../utils/types";
import { removeUserId, setUserId } from "../../utils/userStore";

export interface LoginData {
    email: string;
    password: string;
};

export interface RegData {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    country: string;
    birthDate: Date;
    phone: string;
    termsAccepted: boolean;
};

export type LoginAction =
    | { type: 'REQUEST'; input: LoginData }
    | { type: 'SUCCESS'; user: UserDAO | null }
    | { type: 'ERROR'; error: string };


export const loginRequest = (input: LoginData): LoginAction => {
    return { type: 'REQUEST', input };
};

export const loginSuccess = (user: UserDAO): LoginAction => {
    setUserId(user.id);
    return { type: 'SUCCESS', user };
};

export const logout = (): LoginAction => {
    removeUserId();
    return { type: 'SUCCESS', user: null };
};

export const loginFailed = (error: string): LoginAction => {
    removeUserId();
    return { type: 'ERROR', error };
};

interface LoginState {
    data: UserDAO | null;
    isLoading: boolean;
    error: string | null;
};

const initialState: LoginState = {
    data: null,
    error: null,
    isLoading: false
};

export const userReducer = (state = initialState, action: LoginAction): LoginState => {
    switch (action.type) {
        case 'REQUEST':
            return { ...state, isLoading: true };
        case 'SUCCESS':
            return { ...state, isLoading: false, data: action.user };
        case 'ERROR':
            return { ...state, isLoading: false, error: action.error };
        default:
            return state;
    }
};