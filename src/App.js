import './main.scss';

import React, { Component } from 'react';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';

import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { auth } from './actions';
import calendarApp from './reducers';
import NotFound from './components/NotFound';
import Register from './components/Register';
import Login from './components/Login';
import Calendar from './components/Calendar';
import Navbar from './components/Navbar';
import Profile from './components/Profile';
import UEvents from './components/UEvents';
import Tasks from './components/Tasks';

let store = createStore(calendarApp, applyMiddleware(thunk));


const PrivateRoute = ({ Component: ChildComponent, ...rest }) => {
  return <Route {...rest} render={props => {
    if (this.props.auth.isLoading) {
      return <em>Loading...</em>;
    }
    else if (!this.props.auth.isAuthenticated) {
      return <Redirect to="/login" />;
    }
    else {
      return <ChildComponent {...props} />;
    }
  }} />
}

class RootContainerComponent extends Component {
  componentDidMount() {
    this.props.loadUser();
  }
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <PrivateRoute exact path="/home" component={Calendar} />
          <PrivateRoute exact path="/profile" component={Profile} />
          <PrivateRoute exact path="/events" component={UEvents} />
          <PrivateRoute exact path="/tasks" component={Tasks} />
          <Route exact path="/" component={UEvents} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadUser: () => {
      return dispatch(auth.loadUser());
    }
  }
}

let RootContainer = connect(mapStateToProps, mapDispatchToProps)(RootContainerComponent);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className='top'>
          <Navbar show="true" />
        </div>
        <RootContainer className="app" />
      </Provider>
    )
  }
}
