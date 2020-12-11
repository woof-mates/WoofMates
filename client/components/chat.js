import React from 'react';

import VideoChatContainer from './VideoChat/VideoChatContainer';

import firebaseDB from './Firebase';

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chats: [],
            message: '',
            readError: null,
            writeError: null,
            videoChat: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.openVideo = this.openVideo.bind(this);
        this.closeVideo = this.closeVideo.bind(this);
    }

    async componentDidMount() {
        this.setState({
            readError: null
        });

        try {
            firebaseDB.ref(`${this.props.from}-${this.props.to}/chats`).on("value", snapshot => {
                let chats = [];
                snapshot.forEach(snap => {
                    chats.push(snap.val());
                });
                this.setState({ chats });
            });
        } catch (error) {
            this.setState({ readError: error.message })
        }
    }

    handleChange(event) {
        this.setState({
            message: event.target.value
        })
    }

    async handleSubmit(event) {
        event.preventDefault();
        this.setState({
            writeError: null
        })
        try {
            await firebaseDB.ref(`${this.props.from}-${this.props.to}/chats`).push({
                message: this.state.message,
                timestamp: Date.now()
            });
            await firebaseDB.ref(`${this.props.to}-${this.props.from}/chats`).push({
                message: this.state.message,
                timestamp: Date.now()
            });
        } catch (error) {
            this.setState({
                writeError: error.message
            })
        }
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
        const { chats, videoChat } = this.state;

        if (videoChat) {
            return (
                <div>
                    <VideoChatContainer fromName={this.props.fromName} toName={this.props.toName} closeVideo={this.closeVideo}/>
                </div>
            )
        } else {
            return (
                <div>
                    <button onClick={this.props.closeChat}>Close Chat</button>
                    <button onClick={this.openVideo}>Call</button>
                    <div>
                        {
                            chats.map(chat => {
                                return (
                                    <p key={chat.timestamp}>{chat.message}</p>
                                )
                            })
                        }
                    </div>
                    <form onSubmit={this.handleSubmit}>
                        <input onChange={this.handleChange} value={this.state.message}></input>
                        {this.state.writeError ? <p>{this.state.writeError}</p> : null}
                        <button type="submit">Send</button>
                    </form>
                </div>
            )
        }
    }
}

export default Chat;
