import { Dispatch } from 'react';
import httpRequest, { HTTPmethods } from '../../utils/httpRequest';
import { UserDAO } from '../../utils/types';
import { getUserId } from '../../utils/userStore';
import { LoginAction, loginFailed, loginSuccess } from '../reducers/user';


export const getUser = () => async (dispatch: Dispatch<LoginAction>) => {
    const userId = getUserId();
    if (userId) {
        const user = await httpRequest<UserDAO>(HTTPmethods.GET, `/user/${userId}`);
        dispatch(user.success ? loginSuccess(user.data) : loginFailed(user.error));
    }
};