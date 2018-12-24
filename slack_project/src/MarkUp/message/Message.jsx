import React, { Component } from 'react';
import firebase from '../../Firebase/Firebase';
import { Segment, Comment } from 'semantic-ui-react';
import MessageHeader from './MassegeHeader';

import MessageForm from './MessageForm';

class Message extends Component {
    state = {
        messagesRef: firebase.database().ref('messages')
    }

    render() {
        const { messagesRef } = this.state
        return (
            <React.Fragment>
                <MessageHeader />
                <Segment>
                    <Comment.Group className='messages'>
                    </Comment.Group>
                </Segment>
                <MessageForm messagesRef={messagesRef} />
            </React.Fragment>
        );
    }
}



export default Message;

