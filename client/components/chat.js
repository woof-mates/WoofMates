import React from 'react';
import { connect } from 'react-redux';
import VideoChatContainer from './VideoChat/VideoChatContainer';
import classnames from 'classnames';
import IconButton from '@material-ui/core/IconButton';
import PhoneIcon from '@material-ui/icons/Phone';
import SpeakerNotesOffIcon from '@material-ui/icons/SpeakerNotesOff';
import { getChat, sendChat } from '../store/chat';

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            videoChat: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.openVideo = this.openVideo.bind(this);
        this.closeVideo = this.closeVideo.bind(this);
    }

    async componentDidMount() {
        await this.props.getChat(this.props.from, this.props.to);
    }

    handleChange(event) {
        this.setState({
            message: event.target.value
        })
    }

    async handleSubmit(event) {
        event.preventDefault();

        const today = new Date();
        const hours = (today.getHours() % 12) < 10 ? `0${today.getHours() % 12}` : today.getHours();
        const minutes = today.getMinutes() < 10 ? `0${today.getMinutes()}` : today.getMinutes();
        const ampm = today.getHours() < 12 ? ' AM' : ' PM'
        const time = hours + ":" + minutes + ampm;

        await this.props.sendChat(this.props.from, this.props.to, this.state.message, time, this.props.fromName, this.props.toName);

        this.setState({
            message: ''
        })
    }

    openVideo() {
        this.setState({
            videoChat: true
        })
    }

    closeVideo() {
        this.setState({
            videoChat: false
        })
    }

    render() {
        const { videoChat } = this.state;
        const { chat } = this.props;

        if (videoChat) {
            return (
                <div>
                    <VideoChatContainer fromName={this.props.fromName} toName={this.props.toName} closeVideo={this.closeVideo}/>
                </div>
            )
        } else {
            return (
                <div>
                    <div id='chatButtons'>
                        <IconButton onClick={this.openVideo} >
                            <PhoneIcon />
                        </IconButton>
                        <IconButton onClick={this.props.closeChat}>
                            <SpeakerNotesOffIcon />
                        </IconButton>
                    </div>
                    <div id="ChatBody">
                        {
                            chat.map(chat => {
                                return (
                                    <p className={classnames({recipient: this.props.fromName !== chat.from}, {sender: this.props.fromName === chat.from})} key={chat.timestamp + chat.message}>
                                        <span className='messages'>{chat.message}</span>
                                        <span className='timestamp'>{chat.timestamp}</span>
                                    </p>
                                )
                            })
                        }
                    </div>
                    <form id = "chatTypeMessageForm" onSubmit={this.handleSubmit}>
                        <input id="chatTextInputField" style={{float: 'right'}} onChange={this.handleChange} value={this.state.message}></input>
                        <button id="chatSendButton" style={{float: 'right'}} type="submit">Send</button>
                        {this.state.writeError ? <p>{this.state.writeError}</p> : null}
                    </form>
                </div>
            )
        }
    }
}

const mapState = (state) => {
    return {
        chat: state.chat
    }
}

const mapDispatch = (dispatch) => ({
    getChat: (fromId, toId ) => dispatch(getChat(fromId, toId)),
    sendChat: (fromId, toId, message, timestamp, from, to) => dispatch(sendChat(fromId, toId, message, timestamp, from, to))
})

export default connect(mapState, mapDispatch)(Chat);
