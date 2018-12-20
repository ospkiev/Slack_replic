import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Grid, Form, Segment, Button, Header, Message, Icon } from 'semantic-ui-react';
import firebase from '../Firebase/Firebase';
import md5 from 'md5';


class Login extends Component {
    state = {
        username: '',
        email: '',
        password: '',
        passwordConfirm: '',
        errors: [],
        userRef: firebase.database().ref('users')
    }

    handleChange = (e) => {
        let value = e.target.value;
        let name = e.target.name;
        this.setState({
            [name]: value,
        })
    }

    isFormEmpty = ({ username, email, password, passwordConfirm }) => {
        if (username.length > 0 && email.length > 0 && password.length > 0 && passwordConfirm.length > 0) {
            return true;
        } else {
            return false;
        }
    }

    isFormValid = () => {
        let errors = [];
        let error;

        if (!this.isFormEmpty(this.state)) {
            error = {
                message: 'Fill all fields'
            };
            this.setState({
                errors: errors.concat(error)
            })
            return false;
        } else if (!this.isPasswordValid(this.state)) {
            error = {
                message: 'Password is invalid'
            };
            this.setState({
                errors: errors.concat(error)
            })
            return false;
        } else {
            return true;
        }
    }

    handleInput = (errors, inputName) => {
        // console.log('object');
        return errors.some(el => el.message.toLowerCase().includes(inputName)) ? 'error' : '';
    }

    render() {
        return (
            <div>
                <Grid textAlign='center' verticalAlign='middle' className='app'>
                    <Grid.Column style={{ maxWidth: 450 }}>

                        <Header textAlign='center' icon color='blue' as='h2'>
                            <Icon name='code branch' color='blue' />
                            Login to Slack Replic
                        </Header>
                        <Form size='large' onSubmit={this.handleSubmit}>
                            <Segment stacked>
                                <Form.Input className fluid name='username' icon='mail' iconPosition='left' placeholder='Email' type='text' onChange={this.handleChange} />
                                <Form.Input className fluid name='password' icon='lock' iconPosition='left' placeholder='Password' type='password' onChange={this.handleChange} />
                                <Button color='grey' fluid size='large'>Login</Button>
                            </Segment>
                        </Form>
                        <Message>
                            Don`t have an account?
                    <NavLink to='/registration'>Registration</NavLink>
                        </Message>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

export default Login;