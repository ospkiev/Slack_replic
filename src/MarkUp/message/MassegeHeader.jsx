import React, { Component } from 'react';
import { Segment, Header, Icon, Subheader, Input } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';


class MessageHeader extends Component {

    render() {
        return (
            <Segment clearing>
                <Header fluid='true' as='h2' floated='left' style={{ marginBottom: 0 }}>
                    <span>
                        {this.props.currentChannel ? this.props.currentChannel.name : 'Channel'}
                        <Icon name='star outline' color='black' />
                    </span>
                    <Header.Subheader>
                        {this.props.countUser}
                    </Header.Subheader>
                </Header>
                <Header floated='right'>
                    <Input size='mini' icon='search' name='searchTerm' placeholder='Search' onChange={this.props.inputFunction} />
                </Header>
            </Segment>
        );
    }
}

function mapStateToProps(state) {
    return {
        // currentUser: state.user.currentUser,
        currentChannel: state.channel,

    }
}

export default withRouter(connect(mapStateToProps, null)(MessageHeader));