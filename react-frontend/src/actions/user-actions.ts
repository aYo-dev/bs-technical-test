import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux';
import axios, { AxiosResponse } from 'axios';

import { GetUsersActionTypes } from './action-types';
import { User } from '../interfaces/user.interface';

const API_URL = 'http://0.0.0.0:8080/api';

const getRequestUrl = (path: string) => `${API_URL}/${path}`;

export const getUsersRequest = () => ({
  type: GetUsersActionTypes.GET_USERS_REQUEST,
});

export const getUsersSuccess = (users: User[]) => ({
  type: GetUsersActionTypes.GET_USERS_SUCCESS,
  payload: users,
});

export const getUsersFailure = () => ({
  type: GetUsersActionTypes.GET_USERS_FAILURE,
});


export const getUsers = async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
  try {
    dispatch(getUsersRequest());
    const url = getRequestUrl('users');
    const response: AxiosResponse<User[]> = await axios.get(url);

    dispatch(getUsersSuccess(response.data));
  } catch (e) {
    dispatch(getUsersFailure());
  }
} 