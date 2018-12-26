import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import UserPanel from '../UserPAnel/UserPanel';
import Channels from '../../Channels/Channels';
import DirectMessages from '../../DirectMessages/DirectMessages';
import { connect } from 'react-redux';

class SidePanel extends Component {
    render() {
        return (
            <Menu size='large' inverted fixed='left' vertical style={{ background: this.props.colors.colorsPrim, fontSize: '1.2rem' }}>
                <UserPanel />
                <Channels />
                <DirectMessages />
            </Menu>
        );
    }
}

function mapStateToProps(state) {
    return {
        colors: state.setColorsReducer,
    }
}


export default connect(mapStateToProps, null)(SidePanel);