import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux';
import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';

import { GetUsersActionTypes, CreateUserActionTypes } from './action-types';
import { User } from '../interfaces/user.interface';
import { SimpleAction, DataAction } from './action-interfaces';
import { UserFormValues } from '../components/CreateUserForm/user-form-interfaces';

const API_URL = 'http://0.0.0.0:8080/api';

const getRequestUrl = (path: string) => `${API_URL}/${path}`;

export const getUsersRequest = (): SimpleAction => ({
  type: GetUsersActionTypes.GET_USERS_REQUEST,
});

export const getUsersSuccess = (users: User[]): DataAction<User[]> => ({
  type: GetUsersActionTypes.GET_USERS_SUCCESS,
  payload: users,
});

export const getUsersFailure = (): SimpleAction => ({
  type: GetUsersActionTypes.GET_USERS_FAILURE,
});

export const createUsersRequest = (): SimpleAction => ({
  type: CreateUserActionTypes.CREATE_USERS_REQUEST,
});

export const createUsersSuccess = (user: User): DataAction<User> => ({
  type: CreateUserActionTypes.CREATE_USERS_SUCCESS,
  payload: user,
});

export const createUsersFailure = (): SimpleAction => ({
  type: CreateUserActionTypes.CREATE_USERS_FAILURE,
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

export const createUser = async (dispatch: ThunkDispatch<{}, {}, AnyAction>, user: UserFormValues): Promise<void> => {
  try {
    dispatch(createUsersRequest());
    const url = getRequestUrl('users/commands');
    const options = {
      method: 'POST',
      headers: { 'content-type': 'application/vnd.in.biosite.create-user+json' },
      data: user,
      url,
    } as AxiosRequestConfig;
    const response: AxiosResponse<User> = await axios(options);

    dispatch(createUsersSuccess(response.data));
  } catch (e) {
    dispatch(createUsersFailure());
  }
} 
