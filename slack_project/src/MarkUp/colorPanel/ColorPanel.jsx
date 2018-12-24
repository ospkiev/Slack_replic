import React, { Component } from 'react';
import { Sidebar, Menu, Button, Divider } from 'semantic-ui-react';

class ColorPanel extends Component {
    render() {
        return (
            <Sidebar as={Menu} icon='labeled' inverted visible vertical width='very thin'>
                <Divider />
                <Button icon='add' size='small' color='blue' />
            </Sidebar>
        );
    }
}

export default ColorPanel;