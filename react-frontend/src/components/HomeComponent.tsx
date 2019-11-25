import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import { User } from '../interfaces/user.interface';
import { AppState } from '../store/root-reducer';
import { getUsers } from '../actions/user-actions';
import UserTableComponent from './UserTableComponent/UserTableComponent';
import NavigationComponent from './Navigation/NavigationComponent';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
);

export const Home = () => {
  const dispatch = useDispatch();
  const users: User[] = useSelector((state: AppState) => state.users.users);
  const classes = useStyles();

  useEffect(() =>{
    getUsers(dispatch);
  }, [users.length, dispatch]);

  return (
    <div className={classes.root}>
      <NavigationComponent title="Users"/>
      <UserTableComponent users={users} />
    </div>
  )
}
  
