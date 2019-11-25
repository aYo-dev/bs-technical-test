import React from 'react';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { curry } from 'lodash';
import { TableRow, IconButton } from 'material-ui';
import { TableCell } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';

import { deleteUser } from '../../../actions/user-actions';
import { User } from '../../../interfaces/user.interface';


interface Props {
  userIndex: number;
  user: User;
}

const editUser = (history: any, userId: string): void => {
  history.push(`edit/${userId}`);
}

const getActions = (userId: string, actions: any) => 
  <div>
    <IconButton onClick={() => actions.deleteUser(userId)}>
      <DeleteForeverIcon />
    </IconButton>
    <IconButton onClick={() => actions.editUser(userId)}>
      <EditIcon />
    </IconButton>
  </div>

const UserTableRowComponent = ({userIndex, user}: Props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const actions = {
    deleteUser: curry(deleteUser)(dispatch),
    editUser: curry(editUser)(history),
  }
  
  return (
    <TableRow key={userIndex}>
      <TableCell>{userIndex}</TableCell>
      <TableCell align="right">{user.firstName}</TableCell>
      <TableCell align="right">{user.lastName}</TableCell>
      <TableCell align="right">{user.qualifications}</TableCell>
      <TableCell align="right">{getActions(user.id, actions)}</TableCell>
    </TableRow>
  )
}

export default UserTableRowComponent;