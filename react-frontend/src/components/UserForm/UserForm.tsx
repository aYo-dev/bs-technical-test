import React, { Dispatch } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { createStyles, makeStyles } from '@material-ui/core/styles';

import validate from './validation';
import { createUser, editUser } from '../../actions/user-actions';
import { UserFormValues } from '../../interfaces/user-form.interface';
import { withRouter, useParams, useHistory } from 'react-router';
import { User } from '../../interfaces/user.interface';
import { AppState } from '../../store/root-reducer';
import NavigationComponent from '../Navigation/NavigationComponent';

const useStyles = makeStyles(() =>
  createStyles({
    form: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
  }),
);

const getErrorMessage = (message: string | undefined) => 
  message &&
    <small className="form-text text-danger">
      {message}
    </small>

const onSubmitHadler = (dispatch: Dispatch<any>, userId: string, data: UserFormValues) =>
  userId ? editUser(dispatch, {...data, id: userId}) : createUser(dispatch, data) ;

const getTitle = (userId: string): string => userId ? 'Edit user' : 'Create user';

export const UserForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { userId } = useParams();
  const user: User = useSelector((state: AppState) =>
    state.users.users.find(u => u.id === userId)) || {} as User;

  const formik = useFormik({
    initialValues: {
      firstName: user.firstName || '',
      lastName: user.lastName || '',
    },
    validate,
    onSubmit: values => {
      onSubmitHadler(dispatch, userId as string, values as UserFormValues);
      history.push('/');
    },
  });

  const classes = useStyles();

  return (
    <div>
      <NavigationComponent title={getTitle(userId as string)}/>
      <form onSubmit={formik.handleSubmit} className={classes.form}>
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            className="form-control"
            name="firstName"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.firstName}
          />
          {getErrorMessage(formik.errors.firstName)}

        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            className="form-control"
            name="lastName"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.lastName}
          />
          {getErrorMessage(formik.errors.lastName)}
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default withRouter(UserForm);