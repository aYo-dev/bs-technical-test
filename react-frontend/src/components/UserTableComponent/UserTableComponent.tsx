import React  from 'react';
import { Theme, makeStyles,  createStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import UserTableRowComponent from './UserTableRowComponent/UserTableRowComponent';
import { User } from '../../interfaces/user.interface';

type Props = {
  users: User[];
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
}));

const TableHeader = () =>
  <TableHead>
    <TableRow>
      <TableCell>#</TableCell>
      <TableCell align="right">First Name</TableCell>
      <TableCell align="right">Last Name</TableCell>
      <TableCell align="right">Qualifications</TableCell>
      <TableCell align="right">Actions</TableCell>
    </TableRow>
  </TableHead>

const geTableBody = (users: User[]) => users.map((u, i) => <UserTableRowComponent userIndex={i} user={u}/>);

const UserTableComponent = ({ users }: Props) => {
  const classes = useStyles();
  
  return (
    <Paper className={classes.root}>
      <Table className={classes.table} aria-label="simple table">
      <TableHeader />
      <TableBody>
        {geTableBody(users)}
      </TableBody>
      </Table>
    </Paper>
  );
}

export default UserTableComponent;