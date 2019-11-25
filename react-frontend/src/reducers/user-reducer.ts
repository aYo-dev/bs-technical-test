import { combineReducers, AnyAction } from 'redux';

import { GetUsersActionTypes, CreateUserActionTypes, DeleteUserActionTypes, EditUserActionTypes } from '../actions/action-types';
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
    
      case CreateUserActionTypes.CREATE_USER_SUCCESS:
        return [...state, ...action.payload];

      case DeleteUserActionTypes.DELETE_USER_SUCCESS:
        return state.filter((u) => u.id !== action.payload);

      case EditUserActionTypes.EDIT_USER_SUCCESS:
          return state.map((u) => u.id === action.payload.id ? action.payload : u);

      default:
        return state;
    }
  },
});