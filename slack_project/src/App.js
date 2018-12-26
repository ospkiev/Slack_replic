import React, { Component } from 'react';

import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import MetaPanel from './MarkUp/metaPanel/MetaPanel';
import SidePanel from './MarkUp/sidePanel/SidePanel';
import ColorPanel from './MarkUp/colorPanel/ColorPanel';
import Message from './MarkUp/message/Message';
import './App.css';

const App = () => {
  console.log(this.props.colors); /// need fix
  return (
    <Grid columns='equal' className='app' style={{ background: this.props.colors.colorSec }}>

      <ColorPanel />
      <SidePanel />
      <Grid.Column style={{ marginLeft: 320 }}>
        <Message />
      </Grid.Column>
      <Grid.Column width={4}>
        <MetaPanel />
      </Grid.Column>
    </Grid>
  )
};


function mapStateToProps(state) {
  return {
    colors: state.setColorsReducer,
  }
}


export default connect(mapStateToProps, null)(App);