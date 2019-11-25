import React from 'react';
import { useHistory } from 'react-router';
import AddIcon from '@material-ui/icons/Add';
import HomeIcon from '@material-ui/icons/Home';
import { AppBar, IconButton } from 'material-ui';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

interface Props {
  title: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      color: 'white',
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
    },
    title: {
      flexGrow: 1,
      color: 'white',
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
    },
  }),
);

const NavigationComponent = ({title}: Props) => {
  const history = useHistory();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar>
          <Typography variant="h6" className={classes.title}>
              {title}
          </Typography>
          <IconButton className={classes.menuButton} onClick={() => history.push('/create')}>
            <AddIcon />
          </IconButton>
          <IconButton className={classes.menuButton} onClick={() => history.push('/')}>
            <HomeIcon />
          </IconButton>
      </AppBar>
    </div>
    
  );
}

export default NavigationComponent;