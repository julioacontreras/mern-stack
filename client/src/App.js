import React from 'react';
import PropTypes from 'prop-types';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import './App.css';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import PostListPage from './Post/pages/PostListPage/PostListPage';
import PostDetailPage from './Post/pages/PostDetailPage/PostDetailPage';
import LoginPage from './Auth/pages/Login/LoginPage';
import LogoutPage from './Auth/pages/Login/LogoutPage';
import SignupPage from './Auth/pages/Login/SignupPage';
import Navbar from './Nav/components/Navbar';
import { Provider } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.min.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1ecde2',
    },
  },
});

function App(props) {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={props.store}>
        <div className="w-100">
          <Navbar />
          <div className="w-100 pt-5 mt-5">
              <BrowserRouter>
                <Switch>
                  <Route path="/" exact component={PostListPage} />
                  <Route path="/posts/:cuid/:slug" exact component={PostDetailPage} />
                  <Route path="/login" exact component={LoginPage} />
                  <Route path="/logout" exact component={LogoutPage} />
                  <Route path="/signup" exact component={SignupPage} />                  
                </Switch>
              </BrowserRouter>
          </div>
        </div>
      </Provider>
    </ThemeProvider>
  );
}

App.propTypes = {
  store: PropTypes.object.isRequired,
};

export default App;
