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
        errors: [],
        // userRef: firebase.database().ref('users')
    }

    handleChange = (e) => {
        let value = e.target.value;
        let name = e.target.name;
        this.setState({
            [name]: value,
        })
    }

    isFormEmpty = ({ email, password }) => {
        if (email.length > 0 && password.length > 0) {
            return true;
        } else {
            return false;
        }
    }

    isFormValid = () => {
        let errors = [];
        let error;

        if (this.isFormEmpty(this.state)) {
            error = {
                message: 'Fill all fields'
            };
            this.setState({
                errors: errors.concat(error)
            })
            return false;
        } else {
            this.setState({
                errors: []
            })
            return true;
        }
    }

    handleInput = (errors, inputName) => {
        // console.log('object');
        return errors.some(el => el.message.toLowerCase().includes(inputName)) ? 'error' : '';
    }

    hadleSubmit = e => {
        e.preventDefault();
        if (this.isFormValid(this.state)) {
            firebase
                .auth()
                .signInWithEmailAndPassword(this.state.email, this.state.password)
                .then(signedInUser => {
                    console.log(signedInUser);
                })
                .catch(err => {
                    console.log(err);
                    this.setState({
                        errors: this.state.errors.concat(err),
                        loading: false
                    })
                })
        }
    }

    render() {

        const { errors, password, email } = this.state
        return (

            <Grid textAlign='center' verticalAlign='middle' className='app'>
                <Grid.Column style={{ maxWidth: 450 }}>

                    <Header textAlign='center' icon color='blue' as='h2'>
                        <Icon name='code branch' color='blue' />
                        Login to Slack Replic
                        </Header>
                    <Form size='large' onSubmit={this.hadleSubmit}>
                        <Segment stacked>
                            <Form.Input className={this.handleInput(errors, 'email')} fluid name='username' icon='mail' iconPosition='left' placeholder='Email' type='text' onChange={this.handleChange} />
                            <Form.Input className={this.handleInput(errors, 'password')} fluid name='password' icon='lock' iconPosition='left' placeholder='Password' type='password' onChange={this.handleChange} />
                            <Button color='grey' fluid size='large'>Login</Button>
                        </Segment>
                    </Form>

                    {errors.length > 0 && (
                        <Message error>
                            <h3>Error</h3>
                            {errors.map(el => <p key={el.message}>{el.message}</p>)}
                        </Message>
                    )}
                    <Message>
                        Don`t have an account?
                    <NavLink to='/registration'>Registration</NavLink>
                    </Message>
                </Grid.Column>
            </Grid>

        );
    }
}



export default Login;