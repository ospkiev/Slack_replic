import React, { Component } from 'react';
import { Image, Dropdown, Header, Icon, Grid, Button, Input, Modal, } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import firebase from '../../Firebase/Firebase';
import AvatarEditor from 'react-avatar-editor';



class UserPanel extends Component {
    state = {
        modal: false,
        previewImage: '',
        croppedImage: '',
        blob: '',
        uploadedCroppedImage: "",
        storageRef: firebase.storage().ref(),
        userRef: firebase.auth().currentUser,
        usersRef: firebase.database().ref("users"),
        metadata: {
            contentType: "image/jpeg"
        }
    }

    openModal = () => this.setState({ modal: true });

    closeModal = () => this.setState({ modal: false });


    uploadCroppedImage = () => {
        const { storageRef, userRef, blob, metadata } = this.state;
        storageRef
            .child(`avatars/user-${userRef.uid}`)
            .put(blob, metadata)
            .then(snap => {
                snap.ref.getDownloadURL().then(downloadURL => {
                    this.setState({ uploadedCroppedImage: downloadURL }, () =>
                        this.changeAvatar()
                    );
                });
            });
    };
    changeAvatar = () => {
        this.state.userRef
            .updateProfile({
                photoURL: this.state.uploadedCroppedImage
            })
            .then(() => {
                console.log("PhotoURL updated");
                this.closeModal();
            })
            .catch(err => {
                console.error(err);
            });
        this.state.usersRef
            .child(this.props.currentUser.uid)
            .update({ avatar: this.state.uploadedCroppedImage })
            .then(() => {
                console.log("User avatar updated");
            })
            .catch(err => {
                console.error(err);
            });
    };




    handleChange = event => {
        const file = event.target.files[0];
        const reader = new FileReader();

        if (file) {
            reader.readAsDataURL(file);
            reader.addEventListener('load', () => {
                this.setState({ previewImage: reader.result })
            })
        }
    }


    handleCropImage = () => {
        if (this.avatarEditor) {
            this.avatarEditor.getImageScaledToCanvas().toBlob(blob => {
                let imageUrl = URL.createObjectURL(blob);
                this.setState({
                    croppedImage: imageUrl,
                    blob,
                })
            })
        }
        console.log('klnib');
    }


    dropdownOptions = () => [
        {
            key: 'user',
            text: <span><Icon name='sign-in' />Signed in as <strong>{this.props.name}</strong></span>,
            disabled: true,
        },
        {
            key: 'avatar',
            text: <span onClick={this.openModal}>Change Avatar</span>,
        },
        {
            key: 'out',
            text: <span onClick={this.signOut} ><Icon name='sign-out' />Sign Out</span>,
        }
    ]

    signOut = () => {
        firebase
            .auth()
            .signOut()
            .then(() => {
                console.log('sign out');
            })
    }

    render() {

        return (
            <Grid style={{
                background: '4c3c4c'
            }}>
                <Grid.Column>
                    <Grid.Row style={{
                        padding: '1.2rem',
                        margin: '0'
                    }}>
                        <Header inverted floated='left' as='h2'>
                            <Icon name='cloud' />
                            <Header.Content>Slack replic</Header.Content>
                        </Header>
                    </Grid.Row>

                    <Modal open={this.state.modal} onClose={this.closeModal}>
                        <Modal.Header>Change Avatar</Modal.Header>
                        <Modal.Content>
                            <Input fluid type="file" label="New Avatar" name="previewImage" onChange={this.handleChange} />
                            <Grid centered stackable columns={2}>
                                <Grid.Row centered>
                                    <Grid.Column className="ui center aligned grid">
                                        {/* Image Preview */}

                                        {this.state.previewImage && (
                                            <AvatarEditor
                                                ref={node => (this.avatarEditor = node)}
                                                image={this.state.previewImage}
                                                width={120}
                                                height={120}
                                                border={50}
                                                scale={1.2}
                                            />
                                        )}

                                    </Grid.Column>
                                    <Grid.Column>
                                        {/* Cropped Image Preview */}
                                        {this.state.croppedImage && (
                                            <Image
                                                style={{ margin: '3.5em auto' }}
                                                width={100}
                                                height={100}
                                                src={this.state.croppedImage}
                                            />
                                        )}
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button color="green" inverted onClick={this.uploadCroppedImage}>
                                <Icon name="save" /> Change Avatar
              </Button>
                            <Button color="green" inverted onClick={this.handleCropImage}>
                                <Icon name="image" /> Preview
              </Button>
                            <Button color="red" inverted onClick={this.closeModal}>
                                <Icon name="remove" /> Cancel
              </Button>
                        </Modal.Actions>
                    </Modal>
                    <Header style={{ padding: '0.25rem' }} as='h4' inverted>
                        <Dropdown trigger={<span style={{ marginleft: '1rem' }}> <Image src={this.props.img} spaced='right' avatar />{this.props.name}</span>} options={this.dropdownOptions()} />
                    </Header>
                </Grid.Column>
            </Grid >
        );
    }
}

function mapStateToProps(state) {
    return {
        name: state.user.currentUser.displayName,
        img: state.user.currentUser.photoURL,
        colors: state.colors,
        currentUser: state.user.currentUser,
    }
}



export default withRouter(connect(mapStateToProps, null)(UserPanel));