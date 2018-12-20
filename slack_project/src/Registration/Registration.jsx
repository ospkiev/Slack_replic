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
        errors: [],
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

    isPasswordValid = ({ password, passwordConfirm }) => {
        if (password === passwordConfirm) {
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


    handleSubmit = (e) => {
        if (this.isFormValid()) {
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
    }




    render() {
        const { errors } = this.state;
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
                    {errors.length > 0 && (
                        <Message error>
                            <h3>Error</h3>
                            {errors.map(el => <p key={el.message}>{el.message}</p>)}
                        </Message>
                    )}
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