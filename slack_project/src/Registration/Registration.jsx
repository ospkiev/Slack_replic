import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Grid, Form, Segment, Button, Header, Message, Icon } from 'semantic-ui-react';
import firebase from '../Firebase/Firebase';
import { auth } from 'firebase';

class Registration extends Component {
    state = {
        username: '',
        email: '',
        password: '',
        passwordConfirm: '',
    }

    handleChange = (e) => {
        let value = e.target.value;
        let name = e.target.name;
        this.setState({
            [name]: value,
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        firebase
            .auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(createUser => {
                console.log(createUser);
            })
            .catch(error => {
                console.log(error);
            })
    }


    render() {

        return (
            <Grid textAlign='center' verticalAlign='middle' className='app'>
                <Grid.Column style={{ maxWidth: 450 }}>

                    <Header textAlign='center' icon color='orange' as='h2'>
                        <Icon name='commet alternate' color='orange' />
                        Register For Slack Replic
                </Header>
                    <Form size='large' onSubmit={this.handleSubmit}>
                        <Segment stacked>
                            <Form.Input fluid name='username' icon='user' iconPosition='left' placeholder='Username' type='text' onChange={this.handleChange} />
                            <Form.Input fluid name='email' icon='mail' iconPosition='left' placeholder='Email' type='email' onChange={this.handleChange} />
                            <Form.Input fluid name='password' icon='lock' iconPosition='left' placeholder='Password' type='password' onChange={this.handleChange} />
                            <Form.Input fluid name='passwordConfirm' icon='repeat' iconPosition='left' placeholder='Password Confirm' type='password' onChange={this.handleChange} />
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