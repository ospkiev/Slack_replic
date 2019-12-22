import React, { Component } from 'react';
import { Modal, Button, Icon, Input } from 'semantic-ui-react';
import mime from 'mime-types';

class FileModal extends Component {
    state = {
        file: null,
        correctType: ['image/jpg', 'image/png', 'image/jpeg']
    }

    addFile = e => {
        const file = e.target.files[0];
        if (file) {
            this.setState({
                file,
            })
        }
    }

    sendFile = () => {

        if (this.state.file !== null) {
            if (this.isFileTypeCorect(this.state.file.name)) {
                const metadata = {
                    contentType: mime.lookup(this.state.file.name)
                }
                this.props.uploadFile(this.state.file, metadata);
                this.props.closeModal();
                this.setState({
                    file: null,
                })
            }
        }
    }



    isFileTypeCorect = fileName => this.state.correctType.includes(mime.lookup(fileName))

    render() {
        const { modal, closeModal } = this.props;
        return (
            <Modal open={modal} onClose={closeModal}>
                <Modal.Header>Select an Image File</Modal.Header>
                <Modal.Content>
                    <Input fluid lable='File types: jpg, png' name='file' type='file' onChange={this.addFile} />
                </Modal.Content>
                <Modal.Actions>
                    <Button color='green' inverted onClick={this.sendFile}>
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