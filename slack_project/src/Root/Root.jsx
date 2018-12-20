import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import Registration from '../Registration/Registration';
import Login from '../Login/Login';
import App from '../App';


class Root extends Component {
    render() {
        return (
            <Switch>
                {/* <Registration />
                <Login />
                <App /> */}

                <Route exact path='/' component={App} />
                <Route path='/login' component={Login} />
                <Route path='/registration' component={Registration} />
            </Switch>
        );
    }
}

export default Root;