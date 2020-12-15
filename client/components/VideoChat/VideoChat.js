import React from 'react';

import firebase from 'firebase';
import 'firebase/database';
import classnames from 'classnames';
import IconButton from '@material-ui/core/IconButton';
import PhoneIcon from '@material-ui/icons/Phone';
import CallEndIcon from '@material-ui/icons/CallEnd';

class VideoChat extends React.Component {
    constructor(props) {
        super (props);
        this.state = {
            isLoggedIn: false,
            userToCall: this.props.toName,
            username: this.props.fromName
        }

        this.onStartCallClicked = this.onStartCallClicked.bind(this);
        this.renderVideos = this.renderVideos.bind(this);
    }
    

    async componentDidMount() {
        await this.props.onLogin(this.state.username);
        this.setState({
            isLoggedIn: true
        });
    }

    onStartCallClicked() {
        this.props.startCall(this.state.username, this.state.userToCall)
    }

    renderVideos() {
        return (
            <div className={classnames('videos', { active: this.state.isLoggedIn })}>
                <div>
                    <label>{this.state.username}</label><br></br>
                    <video width={475} height={400} ref={this.props.setLocalVideoRef} autoPlay playsInline></video>
                </div>
                <div>
                    <label>{this.props.connectedUser}</label><br></br> 
                    <video width={475} height={400} ref={this.props.setRemoteVideoRef} autoPlay playsInline></video>
                </div>
            </div>
        )
    }

    render() {
        return (
            <section id='container'>
                <IconButton onClick={this.onStartCallClicked} >
                    <PhoneIcon/>
                </IconButton>
                <IconButton onClick={this.props.closeVideo}>
                    <CallEndIcon/>
                </IconButton>
                {this.renderVideos()}
            </section>
        )
    }

}

export default VideoChat;
