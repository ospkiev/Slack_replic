import React, { Component } from 'react';
import { Modal, Button, Icon, Input } from 'semantic-ui-react';

class FileModal extends Component {
    // state = {
    //     modal: true,

    // }

    // closeModal = () => {
    //     this.setState(prev => ({
    //         modal: !prev.modal,
    //     }))

    // }

    render() {
        const { modal, closeModal } = this.props;
        return (
            <Modal open={modal} onClose={closeModal}>
                <Modal.Header>Select an Image File</Modal.Header>
                <Modal.Content>
                    <Input fluid lable='File types: jpg, png' name='file' type='file' />
                </Modal.Content>
                <Modal.Actions>
                    <Button color='green' inverted >
                        <Icon name='checkmark' />Send
                    </Button>
                    <Button color='red' inverted onClick={closeModal}>
                        <Icon name='remove' /> Cancel
                    </Button>
                </Modal.Actions>
            </Modal>
        );
    }
}

export default FileModal;