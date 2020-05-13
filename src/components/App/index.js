import React, {Component} from 'react';

import {BrowserRouter as Router, Route} from 'react-router-dom';
import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import GroupPage from '../Group';
import NamePage from '../Name';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import * as ROUTES from '../../constants/routes';
import {withAuthentication} from '../Session';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/App.css';
import CssBaseline from '@material-ui/core/CssBaseline';

class App extends Component {
  
  render(){
    return(
      <Router>
        <div>
          <CssBaseline />

          <Navigation />
          <Route exact path={ROUTES.LANDING} component={LandingPage} />
          <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
          <Route path={ROUTES.SIGN_IN} component={SignInPage} />
          <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
          <Route path={ROUTES.GROUP} component={GroupPage} />
          <Route path={ROUTES.NAME} component={NamePage} />
          <Route path={ROUTES.ACCOUNT} component={AccountPage} />
          <Route path={ROUTES.ADMIN} component={AdminPage} />
        </div>
      </Router>
    )
  }
}

export default withAuthentication(App);
