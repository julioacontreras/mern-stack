import React from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
// Import Components
import SignupForm from '../../components/SignupForm';
// Import Actions
import { signupRequest } from '../../AuthActions';
// Logo
import Logo from '../../../logo.svg';

const PostListPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSignupAuth = (user) => {
    dispatch(signupRequest(user, (token) => {
      if (token) {
        history.push('/');
      }
    }));
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
          <SignupForm onSignup={handleSignupAuth} />
        </div>
      </div>
    </div>
  );
};

export default PostListPage;
