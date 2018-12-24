import React, { Component } from 'react';
import firebase from 'firebase';
import { Segment, Input, Button } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class MessageForm extends Component {
    state = {
        message: '',
        loading: false,
        errors: [],
    }

    handleChange = (e) => {
        let input = e.target.value;
        let name = e.target.name;
        this.setState({
            [name]: input,
        })
    }

    createMessage = () => {
        const message = {
            content: this.state.message,
            time: firebase.database.ServerValue.TIMESTAMP,
            user: {
                id: this.props.currentUser.uid,
                name: this.props.currentUser.displayName,
                avatar: this.props.currentUser.photoURL,
            }
        }
        return message;
        // console.log(message);
    }

    sendMessage = () => {
        const { messagesRef, currentChannel } = this.props;
        const { message } = this.state;
        if (message) {
            this.setState({ loading: true, })
            // console.log(currentChannel.id);
            // console.log(messagesRef);
            messagesRef
                .child(currentChannel.id)
                .push()
                .set(this.createMessage())
                .then(() => {
                    this.setState({
                        loading: false,
                        message: '',
                    })
                })
                .catch(err => {
                    this.setState({
                        loading: false,
                        errors: this.state.errors.concat(err)
                    })
                })
        }
    }

    render() {
        // console.log(message);
        return (
            <Segment className='message_form'>
                <Input fluid name='message' style={{ marginbottom: '0.7rem' }}
                    // lable={< Button icon='add' />}
                    label={<Button icon='add' />}
                    lableposition='left' placeholder='Write your message' onChange={this.handleChange} />
                <Button.Group icon widths='2'>
                    <Button color='orange' content='Add Reply' lablePosition='left' icon='edit' onClick={this.sendMessage} />
                    <Button color='teal' content='Upload media' lablePosition='right' icon='cloud upload' />
                </Button.Group >
            </Segment>
        );
    }

}

function mapStateToProps(state) {
    return {
        currentUser: state.user.currentUser,
        currentChannel: state.channel,

    }
}

// function mapDispatchToProps(dispatch) {
//     return {
//         setCurrentChannel: function (params) {
//             dispatch(setCurrentChannel(params));
//         }
//     }
// }

export default withRouter(connect(mapStateToProps, null)(MessageForm));