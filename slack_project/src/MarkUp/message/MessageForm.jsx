import React, { Component } from 'react';
import { Segment, Input, Button } from 'semantic-ui-react';

class MessageForm extends Component {
    render() {
        return (
            <Segment className='message_form'>
                <Input fluid name='message' style={{ marginbottom: '0.7rem' }} lable={< Button icon='add' />}
                    lableposition='left' placeholder='Write your message' />
                <Button.Group icon widths='2'>
                    <Button color='orange' content='Add Reply' lablePosition='left' icon='edit' />
                    <Button color='teal' content='Upload media' lablePosition='right' icon='cloud upload' />

                </Button.Group >
            </Segment>
        );
    }

}

export default MessageForm;