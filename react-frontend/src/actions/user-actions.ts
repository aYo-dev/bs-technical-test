import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux';
import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';

import { 
  GetUsersActionTypes,
  CreateUserActionTypes,
  DeleteUserActionTypes,
  EditUserActionTypes,
} from './action-types';
import { User } from '../interfaces/user.interface';
import { SimpleAction, DataAction } from '../interfaces/actions.interface';
import { UserFormValues } from '../interfaces/user-form.interface';

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
  type: CreateUserActionTypes.CREATE_USER_REQUEST,
});

export const createUsersSuccess = (user: User): DataAction<User> => ({
  type: CreateUserActionTypes.CREATE_USER_SUCCESS,
  payload: user,
});

export const createUsersFailure = (): SimpleAction => ({
  type: CreateUserActionTypes.CREATE_USER_FAILURE,
});

export const deleteUsersRequest = (): SimpleAction => ({
  type: DeleteUserActionTypes.DELETE_USER_REQUEST,
});

export const deleteUsersSuccess = (userId: string): DataAction<string> => ({
  type: DeleteUserActionTypes.DELETE_USER_SUCCESS,
  payload: userId,
});

export const deleteUsersFailure = (): SimpleAction => ({
  type: DeleteUserActionTypes.DELETE_USER_FAILURE,
});

export const editUsersRequest = (): SimpleAction => ({
  type: EditUserActionTypes.EDIT_USER_REQUEST,
});

export const editUsersSuccess = (user: User): DataAction<User> => ({
  type: EditUserActionTypes.EDIT_USER_SUCCESS,
  payload: user,
});

export const editUsersFailure = (): SimpleAction => ({
  type: EditUserActionTypes.EDIT_USER_FAILURE,
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

export const deleteUser = async (dispatch: ThunkDispatch<{}, {}, AnyAction>, userId: string): Promise<void> => {
  try {
    dispatch(deleteUsersRequest());
    const url = getRequestUrl('users/commands');
    const options = {
      method: 'POST',
      headers: { 'content-type': 'application/vnd.in.biosite.delete-user+json' },
      data: {
        id: userId
      },
      url,
    } as AxiosRequestConfig;
    
    await axios(options);
    dispatch(deleteUsersSuccess(userId));
  } catch (e) {
    dispatch(deleteUsersFailure());
  }
} 

export const editUser = async (dispatch: ThunkDispatch<{}, {}, AnyAction>, user: any): Promise<void> => {
  try {
    dispatch(editUsersRequest());
    const url = getRequestUrl('users/commands');
    const options = {
      method: 'POST',
      headers: { 'content-type': 'application/vnd.in.biosite.update-user-name+json' },
      data: user,
      url,
    } as AxiosRequestConfig;
    
    await axios(options);
    dispatch(editUsersSuccess(user));
  } catch (e) {
    dispatch(editUsersFailure());
  }
} 

export const addQualification = async (dispatch: ThunkDispatch<{}, {}, AnyAction>, userId: string): Promise<void> => {
  try {
    dispatch(deleteUsersRequest());
    const url = getRequestUrl('users/commands');
    const options = {
      method: 'POST',
      headers: { 'content-type': 'application/vnd.in.biosite.delete-user+json' },
      data: {
        id: userId
      },
      url,
    } as AxiosRequestConfig;
    
    const response = await axios(options);
    dispatch(deleteUsersSuccess(response.data));
  } catch (e) {
    dispatch(deleteUsersFailure());
  }
} 