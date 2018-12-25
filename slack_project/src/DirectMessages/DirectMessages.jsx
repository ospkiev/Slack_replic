import React, { Component } from 'react';
import { Menu, Icon } from 'semantic-ui-react'
import firebase from '../Firebase/Firebase';
import { connect } from 'react-redux';
import {setPrivatChannel, setCurrentChannel} from '../Redux/Actions/setUserAction';


class DirectMessages extends Component {
    state = {
        users: [],
        usersRef: firebase.database().ref('users'),
        connectedRef:firebase.database().ref('.info/connected'),
        onlineRef : firebase.database().ref('onlineUsers'),
    };

    componentDidMount() {
        if (this.props.user) {
            this.addListener(this.props.user.currentUser.uid)
        }
        // console.log(this.props.user);
    };


    addListener = id => {
        // console.log(id);
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
        this.state.connectedRef.on('value',snap => {
            if( snap.val()){
                const ref = this.state.onlineRef.child(id);
                ref.set(true);
                ref.onDisconnect().remove(err =>{
                    if( err !== null){
                        console.log(err)
                    }
                })
            }
        })

        this.state.onlineRef.on('child_added', snap =>{
            if(id !== snap.key){
                this.setUserStatus( snap.key);
            }
        })

        this.state.onlineRef.on('child_removed', snap => {
            if(id !== snap.key){
                this.setUserStatus( snap.key , false);
            }
        })
    };

    setUserStatus = ( id ,status =true) => {
        const updateUsers = this.state.users.map( el => {
            if(el.uid === id){
                el.status = `${status ? 'online' : 'ofline'}`
            }
        })
        this.setState({
            users:updateUsers,
        })
    };

    changeChannel = user =>{
        const channelId = this.getChannelId(user.uid);
        const channelData={
            id: channelId,
            name: user.name,
        };
        this.props.setCurrentChannel(channelData);
        this.props.setPrivatChannel(true);
    };

    getChannelId = userId =>{
        const currentUserId = this.props.user.uid;
        return userId < currentUserId ? `${userId}/${currentUserId}` : `${currentUserId}/${userId}`;
    };


    render() {
        const { users } = this.state;
        // console.log(users);
        return (
            <Menu.Menu className='menu'>
                <Menu.Item>
                    <span>
                        <Icon name='mail' /> Direct Message
         </span>({users.length})
           
         {users.length > 0 && users.map(el => <Menu.Item key={el.uid} onClick={()=>this.changeChannel(el)} style={{ opacity: 0.7, fontstyle:'italic'}}>
         <Icon name='circle' color={el.status === 'online' ? 'green' : 'red'}/> @ {el.name} </Menu.Item>)}
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

// function mapDispatchToProps(dispatch) {
//     return {
//         setUser: function (user) {
//             dispatch(setUser(user))

//         },

//         signOutUser: function (user) {
//             dispatch(signOutUser(user))

//         },

//     }
// }

export default connect(mapStateToProps,{setCurrentChannel,setPrivatChannel})(DirectMessages);