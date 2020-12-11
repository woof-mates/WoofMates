import React from 'react';

import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDZUsDKQ79fy2TRZJWfmiprYqHUdizGLlo",
    authDomain: "dog-chat-74ccf.firebaseapp.com",
    databaseURL: "https://dog-chat-74ccf.firebaseio.com",
    projectId: "dog-chat-74ccf",
    storageBucket: "dog-chat-74ccf.appspot.com",
    messagingSenderId: "391829997647",
    appId: "1:391829997647:web:d5de6332d455f8c3ab823a"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.database();

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chats: [],
            message: '',
            readError: null,
            writeError: null
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        this.setState({
            readError: null
        });

        try {
            db.ref(`${this.props.from}-${this.props.to}/chats`).on("value", snapshot => {
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
            await db.ref(`${this.props.from}-${this.props.to}/chats`).push({
                message: this.state.message,
                timestamp: Date.now()
            });
            await db.ref(`${this.props.to}-${this.props.from}/chats`).push({
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

    render() {
        const { chats } = this.state;
        return (
            <div>
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

export default Chat;