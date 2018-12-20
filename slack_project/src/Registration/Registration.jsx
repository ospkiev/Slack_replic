import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Grid, Form, Segment, Button, Header, Message, Icon } from 'semantic-ui-react';

class Registration extends Component {
    render() {
        return (
            <Grid textAlign='center' verticalAlign='middle' className='app'>
                <Grid.Column style={{ maxWidth: 450 }}>

                    <Header textAlign='center' icon color='orange' as='h2'>
                        <Icon name='commet alternate' color='orange' />
                        Register For Slack Replic
                </Header>
                    <Form size='large'>
                        <Segment stacked>
                            <Form.Input fluid name='username' icon='user' iconPosition='left' placeholder='Username' type='text' />
                            <Form.Input fluid name='email' icon='mail' iconPosition='left' placeholder='Email' type='email' />
                            <Form.Input fluid name='password' icon='lock' iconPosition='left' placeholder='Password' type='password' />
                            <Form.Input fluid name='passwordConfirm' icon='repeat' iconPosition='left' placeholder='Password Confirm' type='password' />
                            <Button color='grey' fluid size='large'>Submit</Button>

                        </Segment>

                    </Form>
                    <Message>
                        Already a user?
                    <NavLink to='/Login'>Login</NavLink>
                    </Message>
                </Grid.Column>
            </Grid>
        );
    }
}

export default Registration;