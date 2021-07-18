import { useSelector } from 'react-redux';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import './Nav.css';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  }
}));

const Navbar = () => {
  const name = useSelector(state => state.auth.name);
  const isLoggedIn = name ? true : false
  const classes = useStyles();

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" className="mainMenu">
          <Link href="/" className="text-white">Home</Link>
        </Typography>
        { !isLoggedIn ? <Link href="/login" className={`${classes.margin} text-white`}>Login</Link> : null }
        { !isLoggedIn ? <Link href="/signup" className={`${classes.margin} text-white`}>Sign up</Link> : null }
        { isLoggedIn ? <p className={`${classes.margin} text-white`}> { name } </p> : null }
        { isLoggedIn ? <Link href="/logout" className={`${classes.margin} text-white`}>Logout</Link> : null }
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
