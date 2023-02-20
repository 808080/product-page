import { Dispatch } from 'react';
import httpRequest, { HTTPmethods } from '../../utils/httpRequest';
import { UserDAO } from '../../utils/types';
import { getUserId } from '../../utils/userStore';
import { UserAction, loginFailed, setUser } from '../reducers/user';

export const getUser = () => async (dispatch: Dispatch<UserAction>) => {
  const userId = getUserId();
  if (userId) {
    const user = await httpRequest<UserDAO>(HTTPmethods.GET, `/user/${userId}`);
    dispatch(user.success ? setUser(user.data) : loginFailed(user.error));
  }
};