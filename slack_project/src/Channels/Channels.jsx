import React, { Component } from 'react';
import { Menu, Icon, Header, Button, Input, Modal, Form } from 'semantic-ui-react';
import firebase from '../Firebase/Firebase';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setCurrentChannel } from '../Redux/Actions/setUserAction'
import { Fragment } from 'react';

class Channels extends Component {
    state = {
        channels: [],
        activeChannels: '',
        modal: false,
        title: '',
        description: '',
        channelsRef: firebase.database().ref('channels'),
        errors: [],
        firstLoad: true,
    }

    componentDidMount() {
        this.addListeners();
    }

    componentWillMount() {
        this.removeListeners();
    }

    removeListeners = () => {
        this.state.channelsRef.off();
    }

    addListeners = () => {
        let loadedChannels = [];
        this.state.channelsRef.on('child_added', snap => {
            loadedChannels.push(snap.val())
            console.log(loadedChannels);
            this.setState({
                channels: loadedChannels
            }, () => { this.loadFirstChannel() })
        })
    }

    showActiveChannel = (params) => {
        this.setState({
            activeChannels: params.id
        })

    }

    loadFirstChannel = () => {
        if (this.state.firstLoad && this.state.channels.length > 0) {
            this.props.setCurrentChannel(this.state.channels[0]);
            this.showActiveChannel(this.state.channels[0]);
        }
        this.setState({
            firstLoad: false,
        })
    }

    showModal = () => {
        this.setState(prev => ({
            modal: !prev.modal,
        }))
    }

    inputHandler = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        this.setState({
            [name]: value,
        })
    }

    addChannel = () => {
        const { channelsRef, description, title } = this.state;
        const key = channelsRef.push().key;
        const newChannel = {
            id: key,
            name: title,
            details: description,
            createdBy: {
                name: this.props.currentUser.displayName,
                avatar: this.props.currentUser.photoURL,
            }
        }      // console.log(newChannel);
        channelsRef
            .child(key)
            .update(newChannel)
            .then(() => {
                this.setState({
                    title: '',
                    description: '',
                })
                this.showModal();
                console.log('channel added');
            })
            .catch(err => console.log(err))
    }

    handleSubmit = e => {
        e.preventDefault();
        if (this.isFormValid(this.state)) {
            // console.log('object');
            this.addChannel();
        }
    }

    isFormEmpty = ({ title, description }) => {
        if (description.length > 0 && title.length > 0) {
            return true;
        } else {
            return false;
        }
    }

    isFormValid = (params) => {
        let errors = [];
        let error;

        if (!this.isFormEmpty(params)) {
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

    render() {
        const { channels, modal } = this.state;
        return (
            <React.Fragment>
                <Menu.Menu style={{ paddingBottom: '2rem' }}>
                    <Menu.Item>
                        <span><Icon name='exchange' />CHANNELS</span>({channels.length})<Icon name='add' onClick={this.showModal} />
                    </Menu.Item>
                    {channels.length > 0 && channels.map(channel => (
                        <Menu.Item key={channel.id} name={channel.name} style={{ opacity: 0.7 }}
                            onClick={() => (this.props.setCurrentChannel(channel), this.showActiveChannel(channel))}
                            active={channel.id === this.state.activeChannels}> #{channel.name}</Menu.Item>
                    ))}
                </Menu.Menu>
                <Modal open={modal} style={{ background: 'green' }} onClose={this.showModal}>
                    <Modal.Header name='add_channel'>Add channel
                        <Modal.Content name='content'>
                            <Form.Input name='title' fluid type='text' onChange={this.inputHandler} placeholder='Enter name' onSubmit={this.handleSubmit} />
                            <Form.Input name='description' fluid type='text' onChange={this.inputHandler} placeholder='Enter description' onSubmit={this.handleSubmit} />
                        </Modal.Content>
                    </Modal.Header>

                    <Modal.Actions name='modal_action'>
                        <Button size='large' color='green' name='button_create' onClick={this.handleSubmit}>ADD</Button>
                        <Button size='large' color='red' name='button_cancel' onClick={this.showModal}>CANCEL</Button>
                    </Modal.Actions>
                </Modal>
            </React.Fragment>
        );
    }
};


function mapStateToProps(state) {
    return {
        currentUser: state.user.currentUser,
        // activeChannel: this.state.activeChannels

    }
}

function mapDispatchToProps(dispatch) {
    return {
        setCurrentChannel: function (params) {
            dispatch(setCurrentChannel(params));
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Channels));
