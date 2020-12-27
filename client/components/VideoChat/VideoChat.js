import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import PhoneIcon from '@material-ui/icons/Phone';
import CallEndIcon from '@material-ui/icons/CallEnd';

class VideoChat extends React.Component {
    constructor(props) {
        super (props);
        this.state = {
            startCall: false,
            userToCall: this.props.toName,
            username: this.props.fromName
        }

        this.renderVideos = this.renderVideos.bind(this);
    }
    
    renderVideos() {
        return (
            <div>
                <div className='video-grid' id='video'>
                    <div className='video-view'>
                        <div id='local_stream' className='video-placeholder'></div>
                        <div id='local_video_info' className='video-profile hide'></div>
                        <div id='video_autoplay_local' className='video_autoplay_local'></div>
                    </div>
                </div> 

            </div>
        )
    }

    render() {
        return (
            <section id='container'>
                <IconButton >
                    <PhoneIcon/>
                </IconButton>
                <IconButton >
                    <CallEndIcon/>
                </IconButton>
                {this.renderVideos()}
            </section>
        )
    }

}

export default VideoChat;
