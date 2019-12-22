import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Grid, Form, Segment, Button, Header, Message, Icon } from 'semantic-ui-react';
import firebase from '../Firebase/Firebase';
import md5 from 'md5';
// import { auth } from 'firebase';

class Registration extends Component {
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

    saveUser = createdUser => {
        return this.state.userRef.child(createdUser.user.uid).set({
            name: createdUser.user.displayName,
            avatar: createdUser.user.photoURL,
        })
    }


    handleSubmit = (e) => {
        if (this.isFormValid()) {
            e.preventDefault();
            firebase
                .auth()
                .createUserWithEmailAndPassword(this.state.email, this.state.password)
                .then(createdUser => {
                    console.log(createdUser);
                    createdUser.user.updateProfile({
                        displayName: this.state.username,
                        photoURL: `http://gravatar.com/avatar/${md5(createdUser.user.email)}?d=identicon`
                    })

                        .then(() => {
                            this.saveUser(createdUser).then(() => console.log('user seved'))
                        })

                        .catch(err => {
                            console.log(err);
                            this.setState({
                                errors: this.state.errors.concat(err)
                            })

                        })
                        .catch(err => {
                            console.log(err);
                            this.setState({
                                errors: this.state.errors.concat(err)
                            })
                        })
                })
        }
    }


    handleInput = (errors, inputName) => {
        // console.log('object');
        return errors.some(el => el.message.toLowerCase().includes(inputName)) ? 'error' : '';
    }



    render() {
        const { errors, username, password, email, passwordConfirm } = this.state
        return (
            <Grid textAlign='center' verticalAlign='middle' className='app'>
                <Grid.Column style={{ maxWidth: 450 }}>

                    <Header textAlign='center' icon color='orange' as='h2'>
                        <Icon name='comment alternate' color='orange' />
                        Register For Slack Replic
                </Header>
                    <Form size='large' onSubmit={this.handleSubmit}>
                        <Segment stacked>
                            <Form.Input className={this.handleInput(errors, 'username')} fluid name='username' icon='user' iconPosition='left' placeholder='Username' type='text' onChange={this.handleChange} />
                            <Form.Input className={this.handleInput(errors, 'email')} fluid name='email' icon='mail' iconPosition='left' placeholder='Email' type='email' onChange={this.handleChange} />
                            <Form.Input className={this.handleInput(errors, 'password')} fluid name='password' icon='lock' iconPosition='left' placeholder='Password' type='password' onChange={this.handleChange} />
                            <Form.Input className={this.handleInput(errors, 'passwordConfirm')} fluid name='passwordConfirm' icon='repeat' iconPosition='left' placeholder='Password Confirm' type='password' onChange={this.handleChange} />
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