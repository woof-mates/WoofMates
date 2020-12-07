import React from 'react';

import firebase from 'firebase';
import 'firebase/database';
import VideoChat from './VideoChat';
import { initiateLocalStream, initiateConnection, listenToConnectionEvents, createOffer, sendAnswer, startCall, addCandidate } from './RTCModule';
import { doLogin, doCandidate, doOffer, doAnswer } from './FirebaseModule';
import 'webrtc-adapter';

class VideoChatContainer extends React.Component {
    constructor(props) {
        super (props);
        this.state = {
            database: firebase.database(),
            connectedUser: null,
            localStream: null,
            localConnection: null
        }

        this.localVideoRef = React.createRef(); 
        this.remoteVideoRef = React.createRef();

        this.startCall = this.startCall.bind(this);
        this.onLogin = this.onLogin.bind(this);
        this.setLocalVideoRef = this.setLocalVideoRef.bind(this);
        this.setRemoteVideoRef = this.setRemoteVideoRef.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }
    
    async componentDidMount () {
      const localStream = await initiateLocalStream();
      this.localVideoRef.srcObject = localStream;
      
      const localConnection = await initiateConnection();
      this.setState({
          localStream,
          localConnection
      })
    };

    shouldComponentUpdate (nextProps, nextState) {
        if (this.state.database !== nextState.database) {
            return false;
        }

        if (this.state.localStream !== nextState.localStream) {
            return false;
        }

        if (this.state.localConnection !== nextState.localConnection) {
            return false;
        }

        return true;
    };

    async startCall (username, userToCall) {
        const { localConnection, database, localStream} = this.state;
        listenToConnectionEvents(localConnection, username, userToCall, database, this.remoteVideoRef, doCandidate);
        createOffer(localConnection, localStream, userToCall, doOffer, database, username);

    };

    async onLogin (username) {
        return await doLogin(username, this.state.database, this.handleUpdate)
    };

    setLocalVideoRef (ref) {
        this.localVideoRef = ref;
    };

    setRemoteVideoRef (ref) {
        this.remoteVideoRef = ref;
    };

    handleUpdate (notif, username) {    
        const { localConnection, database, localStream} = this.state;

        if (notif) {
            switch (notif.type) {
                case 'offer':
                    this.setState({
                        connectedUser: notif.from
                    })

                    listenToConnectionEvents(localConnection, username, notif.from, database, this.remoteVideoRef, doCandidate);

                    sendAnswer(localConnection, localStream, notif, doAnswer, database, username)
                    break;
                case 'answer':
                    this.setState({
                        connectedUser: notif.from
                    });
                    startCall(localConnection, notif);

                    break;
                case 'candidate': 
                    addCandidate(localConnection, notif)
                    break;
                default: 
                    break;
            }
        }
    }

    render() {
        return <VideoChat
            fromName={this.props.fromName}
            toName={this.props.toName}
            startCall={this.startCall}
            onLogin={this.onLogin}
            setLocalVideoRef={this.setLocalVideoRef}
            setRemoteVideoRef={this.setRemoteVideoRef}
            connectedUser={this.state.connectedUser}
        />
    }
}

export default VideoChatContainer;
