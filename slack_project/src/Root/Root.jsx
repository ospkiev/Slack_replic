import React, { Component } from 'react';
import firebase from '../Firebase/Firebase';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setUser } from '../Redux/Actions/setUserAction';
import Registration from '../Registration/Registration';
import Login from '../Login/Login';
import App from '../App';


class Root extends Component {
    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                console.log(user);
                this.props.setUser(user);
                this.props.history.push('/');
            }
        })
    }



    render() {
        return (
            <Switch>
                <Route exact path='/' component={App} />
                <Route path='/login' component={Login} />
                <Route path='/registration' component={Registration} />
            </Switch>
        );
    }
}

// function mapStateToProps(state) {
//     return {
//         isLoading: state.user.isLoading,
//     }
// }

function mapDispatchToProps(dispatch) {
    return {
        setUser: function (user) {
            dispatch(setUser(user))

        },
    }
}

export default withRouter(connect(null, mapDispatchToProps)(Root));