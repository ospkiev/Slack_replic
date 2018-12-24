import React, { Component } from 'react';

import { Segment, Comment } from 'semantic-ui-react';
import MessageHeader from './MassegeHeader';
import MessageForm from './MessageForm';

class Message extends Component {
    render() {
        return (
            <React.Fragment>
                <MessageHeader />
                <Segment>
                    <Comment.Group className='message'>
                    </Comment.Group>
                </Segment>
                <MessageForm />
            </React.Fragment>
        );
    }
}


export default Message;

