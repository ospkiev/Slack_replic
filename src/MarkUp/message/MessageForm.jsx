import React, { Component } from 'react';
import { Segment, Input, Button } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import FileModal from '../../FileModal/FileModal'
import firebase from '../../Firebase/Firebase';
import uuidv4 from 'uuid/v4';

class MessageForm extends Component {
    state = {
        message: '',
        loading: false,
        errors: [],
        modal: false,
        uploadTask: null,
        storageRef: firebase.storage().ref(),
    }

    closeModal = () => {
        this.setState(prev => ({
            modal: !prev.modal,
        }))

    }

    handleChange = (e) => {
        let input = e.target.value;
        let name = e.target.name;
        this.setState({
            [name]: input,
        })
    }

    createMessage = (url = null) => {
        const message = {
            // content: this.state.message,
            time: firebase.database.ServerValue.TIMESTAMP,
            user: {
                id: this.props.currentUser.uid,
                name: this.props.currentUser.displayName,
                avatar: this.props.currentUser.photoURL,
            }
        }
        if (url !== null) {
            message['image'] = url
        } else {
            message['content'] = this.state.message;
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

    uploadFile = (file, metadata) => {
        // console.log(file, metadata);
        const pathToUpload = this.props.currentChannel.id;
        const ref = this.props.messagesRef;
        const filePath = `chat/public/image${uuidv4()}.jpg`;
        this.setState({
            uploadTask: this.state.storageRef.child(filePath).put(file, metadata)
        }, () => {
            this.state.uploadTask.on('state_changed',
                () => {
                    this.state.uploadTask.snapshot.ref
                        .getDownloadURL()
                        .then(downloadUrl => {
                            this.sendFileMessage(downloadUrl, ref, pathToUpload);
                        })
                        .catch(err => console.log(err))
                })
        })
    }

    sendFileMessage = (url, ref, path) => {
        ref.child(path)
            .push()
            .set(this.createMessage(url))
            .catch(err => { console.log(err) })
    }


    render() {
        // console.log(message);
        return (
            <Segment className='message_form'>
                <Input fluid name='message' style={{ marginbottom: '0.7rem' }}
                    // lable={< Button icon='add' />}
                    label={<Button icon='add' />}
                    labelposition='left' placeholder='Write your message' onChange={this.handleChange} />
                <Button.Group icon widths='2'>
                    <Button color='orange' content='Add Reply' labelPosition='left' icon='edit' onClick={this.sendMessage} />
                    <Button color='teal' content='Upload media' labelPosition='right' icon='cloud upload' onClick={this.closeModal} />
                </Button.Group >
                <FileModal closeModal={this.closeModal} modal={this.state.modal} uploadFile={this.uploadFile} />

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