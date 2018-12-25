import React, { Component } from 'react';
import { Menu, Icon } from 'semantic-ui-react'
import firebase from '../Firebase/Firebase';
import { connect } from 'react-redux';

class DirectMessages extends Component {
    state = {
        users: [],
        usersRef: firebase.database().ref('users'),
    }

    componentDidMount() {
        if (this.props.user) {
            this.addListener(this.props.user.uid)
        }
        console.log(this.props.user);
    }


    addListener = id => {
        let loadedUsers = [];
        this.state.usersRef.on('child_added', snap => {
            if (id !== snap.key) {
                let user = snap.val();
                user.uid = snap.key;
                user.status = 'offline';
                loadedUsers.push(user);
                this.setState({
                    users: loadedUsers
                })
            }
        })
    }


    render() {
        const { users } = this.state;
        console.log(users);
        return (
            <Menu.Menu className='menu'>
                <Menu.Item>
                    <span>
                        <Icon name='mail' /> Direct Message
         </span>({users.length})
           
         {users.map(el => <Menu.Item key={el.uid} onClick={() => console.log(el)} style={{ opacity: 0.7, fontstyle:'italic'}}>
         <Icon name='circle'/> @ {el.name} </Menu.Item>)}
                </Menu.Item>
            </Menu.Menu>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
    }
}

export default connect(mapStateToProps, null)(DirectMessages);