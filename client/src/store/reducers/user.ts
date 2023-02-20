import { UserDAO, UserDTO } from '../../utils/types';
import { removeUserId, setUserId } from '../../utils/userStore';

export interface LoginData {
	email: string;
	password: string;
};

export interface RegData extends UserDTO {
	dialCode: string;
	terms: boolean;
	confirmPassword: string;
};

export interface UserEditData extends Omit<UserDTO, 'email' | 'password'> {
	dialCode: string;
};

export type UserAction =
	| { type: 'REQUEST'; input: LoginData }
	| { type: 'SUCCESS'; user: UserDAO | null }
	| { type: 'USER_ERROR'; userError: string }
	| { type: 'ERROR'; error: string };


export const loginRequest = (input: LoginData): UserAction => {
	return { type: 'REQUEST', input };
};

export const setUser = (user: UserDAO): UserAction => {
	setUserId(user.id);
	return { type: 'SUCCESS', user };
};

export const logout = (): UserAction => {
	removeUserId();
	return { type: 'SUCCESS', user: null };
};

export const loginFailed = (error: string): UserAction => {
	removeUserId();
	return { type: 'ERROR', error };
};

export const userDataFailed = (userError: string): UserAction => {
	return { type: 'USER_ERROR', userError };
};

interface LoginState {
	data: UserDAO | null;
	isLoading: boolean;
	error: string | null;
	userError: string | null;
};

const initialState: LoginState = {
	data: null,
	error: null,
	isLoading: false,
	userError: null
};

export const userReducer = (state = initialState, action: UserAction): LoginState => {
	switch (action.type) {
		case 'REQUEST':
			return { ...state, isLoading: true };
		case 'SUCCESS':
			return { ...state, isLoading: false, data: action.user };
		case 'ERROR':
			return { ...state, isLoading: false, error: action.error };
		case 'USER_ERROR':
			return { ...state, isLoading: false, userError: action.userError };
		default:
			return state;
	}
};