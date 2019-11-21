import { combineReducers, AnyAction } from 'redux';

import { GetUsersActionTypes, CreateUserActionTypes } from '../actions/action-types';
import { User } from '../interfaces/user.interface';

export type UsersState = Readonly<{
  users: User[];
}>;

const initialState: UsersState = {
  users: [],
};

export default combineReducers<UsersState, AnyAction>({
  users: (state = initialState.users, action) => {
    switch (action.type) {
      case GetUsersActionTypes.GET_USERS_SUCCESS:
        return [...action.payload];
    
      case CreateUserActionTypes.CREATE_USERS_SUCCESS:
        return [...state, ...action.payload];
      default:
        return state;
    }
  },
});