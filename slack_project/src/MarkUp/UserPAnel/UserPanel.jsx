import React, { Component } from 'react';
import { Image, Dropdown, Header, Icon, Grid, } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import firebase from '../../Firebase/Firebase';


class UserPanel extends Component {
    dropdownOptions = () => [
        {
            key: 'user',
            text: <span><Icon name='sign-in' />Signed in as <strong>User</strong></span>,
            disabled: true,
        },
        {
            key: 'avatar',
            text: <span><Icon name='picture' />Change Avatar</span>,
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
        img: state.user.currentUser.photoURL,
        name: state.user.currentUser.displayName,
    }
}


// function mapDispatchToProps(dispatch) {
//     return {
//         setUser: function (user) {
//             dispatch(setUser(user))

//         },

//         signOutUser: function () {
//             dispatch(signOutUser())

//         },

//     }
// }

export default withRouter(connect(mapStateToProps, null)(UserPanel));