import React, { Component } from 'react';
import { Menu, Icon, Header, Button, Input, Modal, Form } from 'semantic-ui-react';
import { Fragment } from 'react';

class Channels extends Component {
    state = {
        channels: [],
        modal: false,
        title: '',
        description: '',
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

    render() {
        const { channels, modal } = this.state;
        return (
            <React.Fragment>
                <Menu.Menu style={{ paddingBottom: '2rem' }}>
                    <Menu.Item>
                        <span><Icon name='exchange' />CHANNELS</span>({channels.length})<Icon name='add' onClick={this.showModal} />
                    </Menu.Item>
                </Menu.Menu>
                <Modal open={modal} style={{ background: 'green' }} onClose={this.showModal}>
                    <Modal.Header name='add_channel'>Add channel
                        <Modal.Content name='content'>
                            <Form.Input name='title' type='text' onChange={this.inputHandler} />
                            <Form.Input name='description' type='text' onChange={this.inputHandler} />
                        </Modal.Content>
                    </Modal.Header>

                    <Modal.Actions name='modal_action'>
                        <Button size='large' color='green' name='button_create'>ADD</Button >
                        <Button size='large' color='red' name='button_cancel' onClick={this.showModal}>CANCEL</Button >
                    </Modal.Actions>
                </Modal>
            </React.Fragment>
        );
    }
};

export default Channels;