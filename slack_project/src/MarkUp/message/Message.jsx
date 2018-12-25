import React, { Component } from 'react';
import firebase from '../../Firebase/Firebase';
import { Segment, Comment } from 'semantic-ui-react';
import MessageHeader from './MassegeHeader';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import MessageForm from './MessageForm';
import SingleMessage from './SingleMessage';

class Message extends Component {
    state = {
        messagesRef: firebase.database().ref('messages'),
        messages: [],
        loading: true,
    }

    addListener = channelId => {
        let loadedMessages = [];
        this.state.messagesRef.child(channelId).on('child_added', snap => {
            loadedMessages.push(snap.val())
            this.setState({
                messages: loadedMessages,
                loading: false,
            })
        })
    }

    componentDidMount() {
        setTimeout(() => {
            const { currentChannel, currentUser } = this.props;
            if (currentChannel && currentUser) {
                // console.log(currentChannel);
                this.addListener(currentChannel.id)
            }

        }, 1000)

    }

    render() {
        const { messagesRef, messages } = this.state
        return (
            <React.Fragment>
                <MessageHeader />
                <Segment>
                    <Comment.Group className='messages'>
                        {messages.length > 0 && messages.map(
                            message => <SingleMessage key={message.time} message={message} user={message.user} />)}
                    </Comment.Group>
                </Segment>
                <MessageForm messagesRef={messagesRef} />
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {
        currentUser: state.user.currentUser,
        currentChannel: state.channel,

    }
}


export default withRouter(connect(mapStateToProps, null)(Message));

