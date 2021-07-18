import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import React from 'react';
// Import Components
import LoginForm from '../../components/LoginForm';
// Import Actions
import { loginRequest } from '../../AuthActions';
// Logo
import Logo from '../../../logo.svg';


const LoginPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  
  const handleLoginAuth = (user) => {
    dispatch(loginRequest(user, (token) => {
      if (token) {
        history.push('/');
      }
    }))
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 d-flex align-items-center">
          <img className="mx-3" src={Logo} alt="Logo" style={{ height: '72px'}}/>
          <h1 className="mt-4">
             Alaya Blog
          </h1>
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col-6">
          <LoginForm onLogin={handleLoginAuth} />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
