// import React, { Component } from 'react';
// import { Segment, Accordion, Header, Icon, Image } from 'semantic-ui-react';
// import { connect } from 'react-redux';

// class MetaPanel extends Component {
//     state = {
//         activeIndex: 0,
//     }

//     setActiveIndex = (event, titleProps) => {
//         const { index } = titleProps;
//         const { activeIndex } = this.state;
//         const newIndex = activeIndex === index ? -1 : index;
//         this.setState({ activeIndex: newIndex });
//     }


//     render() {
//         console.log(this.props.channel);
//         const { activeIndex } = this.state;
//         if (this.props.channel) {
//             if (this.props.channel.isPrivatChannel) {
//                 return null;
//             }
//         }
//         return (
//             <Segment>
//                 <Header as='h3' attached='top'>
//                     {this.props.channel && this.props.channel.name}
//                 </Header>
//                 <Accordion styled attached='top'>
//                 <Accordion.Title
//                 active={activeIndex === 0} index={0} onClick={this.setActiveIndex}>
//                 <Icon name='dropdown'/>
//                 <Icon name='info'/>
//                 Channel Details     
//                 </Accordion.Title>

//                 <Accordion.Content active={activeIndex === 0}>
//                 {this.props.channel && this.props.channel.details}
//                 </Accordion.Content>
//                 <Accordion.Title active={activeIndex === 1} index={1} onClick={this.setActiveIndex}>
//                 <Icon name='dropdown'/>
//                 <Icon name='pencil alternate'/>
//                 Created By

//                 </Accordion.Title>
//                 <Accordion.Content active={activeIndex === 1}>
//                 <Header as='h3'>

//                 <Image circular scr={this.props.channel && this.props.channel.createdBy.avatar}/>  /// need fix
//                 {this.props.channel && this.props.channel.createdBy.name}
//                 {/* {this.props.channel && this.props.channel.createdBy.photoURL} */}

//                 </Header>
//                 </Accordion.Content>
//                 </Accordion>
//             </Segment>

//         );
//     }
// }

// function mapStateToProps(state){
//     return{
//         channel: state.channel,
//         user: state.user,
//     }
// }

// export default connect(mapStateToProps,null)(MetaPanel);


import React, { Component } from 'react';
import { Segment, Accordion, Header, Icon, Image } from 'semantic-ui-react';
import { connect } from 'react-redux';

class MetaPanel extends Component {

    state = {
        activeIndex: 0,
    }

    setActiveIndex = (event, titleProps) => {
        const { index } = titleProps;
        const { activeIndex } = this.state;
        const newIndex = activeIndex === index ? -1 : index;
        this.setState({
            activeIndex: newIndex,
        })
    }

    render() {
        const { activeIndex } = this.state;

        if (this.props.channel) {  //// need fix !!
            if (this.props.channel.isPrivateChannel) {
                return null;
            }
        }

        return (
            <Segment>
                <Header as='h3' attached='top'>
                    {this.props.channel && this.props.channel.name}
                </Header>
                <Accordion styled attached='true'>
                    <Accordion.Title
                        active={activeIndex === 0}
                        index={0}
                        onClick={this.setActiveIndex}
                    >
                        <Icon name='dropdown' />
                        <Icon name='info' />
                        {this.props.channel && this.props.channel.name}
                    </Accordion.Title>
                    <Accordion.Content
                        active={activeIndex === 0}
                    >
                        {this.props.channel && this.props.channel.details}
                    </Accordion.Content>

                    <Accordion.Title
                        active={activeIndex === 1}
                        index={1}
                        onClick={this.setActiveIndex}
                    >
                        <Icon name='dropdown' />
                        <Icon name='pencil alternate' />
                        Created By
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 1}>
                        <Header as='h3'>
                            <Image circular src={this.props.channel && this.props.channel.createdBy.avatar} />
                            <span>{this.props.channel && this.props.channel.createdBy.name} </span>
                        </Header>
                    </Accordion.Content>
                </Accordion>
            </Segment>
        );
    }
}

function mapStateToProps(state) {
    return {
        channel: state.channel,
        user: state.user,
    }
}

export default connect(mapStateToProps)(MetaPanel);