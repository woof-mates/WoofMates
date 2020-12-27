import React from 'react';
import VideoChat from './VideoChat';


class VideoChatContainer extends React.Component {
    constructor(props) {
        super (props);
    }

    render() {
        return <VideoChat
            closeVideo={this.props.closeVideo}
            fromName={this.props.fromName}
            toName={this.props.toName}
        />
    }
}

export default VideoChatContainer;
