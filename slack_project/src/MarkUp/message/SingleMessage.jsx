import React from 'react';
import { Comment } from 'semantic-ui-react';
import momemt from 'moment';
import { Image } from 'semantic-ui-react';

const isOwnMessage = (message, user) => message.user.id === user.id ? 'message_self' : '';
const timeFromNow = time => momemt(time).fromNow();
const isImage = message => message.hasOwnProperty('image') && !message.hasOwnProperty('content');

const SingleMessage = ({ message, user }) => {
    return (
        <Comment>
            <Comment.Avatar src={message.user.avatar} />
            <Comment.Content className={isOwnMessage(message, user)}>
                <Comment.Author as='a'>
                    {message.user.name}
                </Comment.Author>
                <Comment.Metadata>
                    {timeFromNow(message.time)}
                </Comment.Metadata>
                {isImage(message) ? <Image src={message.image} className='message_image' /> :
                    <Comment.Text>
                        {message.content}
                    </Comment.Text>}
            </Comment.Content>
        </Comment>
    );
};

export default SingleMessage;