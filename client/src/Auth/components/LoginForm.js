import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

function LoginForm({ onLogin }) {
  const [state, setState] = useState({});
  const classes = useStyles();
  const errorMessage = useSelector(state => state.auth.errorMessage);

  const submit = async () => {
    if (state.username && state.password) {
      try {
        onLogin(state);
      } catch(err) {
        console.error(err)
      }
    }
  };

  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
        ...state,
        [evt.target.name]: value
    });
  };  
  
  return (
    <div className={`${classes.root} d-flex flex-column my-4 w-100`}>
        <h3>Login</h3>
        <TextField variant="filled" label="Username" name="username" onChange={handleChange} />
        <TextField variant="filled" type="password" label="Password" name="password" onChange={handleChange} />
        <Button className="mt-4" variant="contained" color="primary" onClick={() => submit()} disabled={!state.username || !state.password }>
          Submit
        </Button>
        { errorMessage ? <p> {errorMessage} </p> : null }
    </div>
  );
}

LoginForm.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default LoginForm;
