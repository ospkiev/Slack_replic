import React, { Component } from 'react';
import firebase from '../../Firebase/Firebase';
import { Segment, Comment } from 'semantic-ui-react';
import MessageHeader from './MassegeHeader';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import MessageForm from './MessageForm';
import SingleMessage from './SingleMessage';

class Message extends Component {
    state = {
        messagesRef: firebase.database().ref('messages'),
        messages: [],
        loading: true,
        countUser: '',
        filterMessage: [],
        inputValue: '',
    }

    addListener = channelId => {
        let loadedMessages = [];
        this.state.messagesRef.child(channelId).on('child_added', snap => {
            loadedMessages.push(snap.val())
            this.setState({
                messages: loadedMessages,
                loading: false,
            })
            this.countUnicUsers(loadedMessages)
        })
    }

    componentDidMount() {
        setTimeout(() => {
            const { currentChannel, currentUser } = this.props;
            if (currentChannel && currentUser) {
                // console.log(currentChannel);
                this.addListener(currentChannel.id)
            }

        }, 1000)

    }

    countUnicUsers = messages => {
        const uniqueUsers = messages.reduce((acc, el) => {
            if (!acc.includes(el.user.name)) {
                acc.push(el.user.name)
            }
            return acc
        }, [])
        this.setState({
            countUser: `${uniqueUsers.length} users`
        })
    }

    inputFunction = (e) => {
        let inputForm = e.target.value;
        this.setState({
            inputValue: inputForm,
        }, () => this.filterMessage()
        )
    }

    filterMessage = () => {
        let result = this.state.messages.filter(el => {
            if (el.content) {
                return el.content.toLowerCase().includes(this.state.inputValue);
            }
        })
        this.setState({
            filterMessage: result,
        })
    }

    render() {


        const { messagesRef, messages, countUser, filterMessage, inputValue } = this.state
        // console.log(filterMessage);
        return (
            <React.Fragment>
                <MessageHeader countUser={countUser} inputFunction={this.inputFunction} filterMessage={this.filterMessage} />
                <Segment>
                    <Comment.Group className='messages'>
                        {filterMessage.length > 0 && inputValue.length !== ''
                            ? filterMessage.map(i => <SingleMessage key={i.time} message={i} user={i.user} />)
                            : messages.length > 0 && messages.map(
                                message => <SingleMessage key={message.time} message={message} user={message.user} />)}
                    </Comment.Group>
                </Segment>
                <MessageForm messagesRef={messagesRef} />
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {
        currentUser: state.user.currentUser,
        currentChannel: state.channel,
    }
}


export default withRouter(connect(mapStateToProps, null)(Message));

