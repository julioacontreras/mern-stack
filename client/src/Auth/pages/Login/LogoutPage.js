import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import React from 'react';
import Typography from "@material-ui/core/Typography";
// Import Actions
import { logoutRequest } from '../../AuthActions';

const LogoutPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  
  dispatch(logoutRequest({}, () => {
    console.log('chegou')
    history.push('/login');
  }))

  return (
    <Typography align="center">Logout done!</Typography>
  );
};

export default LogoutPage;
