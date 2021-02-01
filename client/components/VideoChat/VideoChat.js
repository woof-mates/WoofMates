import React from "react";
import AgoraRTC from 'agora-rtc-sdk-ng';
import {rtc, options} from './Agora.js';
import IconButton from '@material-ui/core/IconButton';
import PhoneDisabledIcon from '@material-ui/icons/PhoneDisabled';

class VideoChat extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            joined: false,
            remote: false,
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleLeave = this.handleLeave.bind(this)
    }

    componentDidMount() {
        this.handleSubmit()
    }

    componentWillUnmount() {
        this.handleLeave()
    }

    async handleSubmit() {
        try {
            this.setState({
                joined: true
            })

            rtc.client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

            rtc.client.on("user-published", async (user, mediaType) => {
                await rtc.client.subscribe(user, mediaType);
                this.setState({
                    remote: true
                })
                if (mediaType === "video") {
                    const remoteVideoTrack = user.videoTrack;

                    remoteVideoTrack.play("remote-stream")

                }

                if (mediaType === "audio") {
                    const remoteAudioTrack = user.audioTrack;
                    remoteAudioTrack.play();
                }
            });

            const uid = await rtc.client.join(
                options.appId,
                options.channel,
                options.token,
                null
            );

            rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
            rtc.localVideoTrack = await AgoraRTC.createCameraVideoTrack();

            await rtc.client.publish([rtc.localAudioTrack, rtc.localVideoTrack]);
            
            rtc.localVideoTrack.play("local-stream");


            rtc.client.on("user-unpublished", (user) => {
                this.setState({
                    remote: false
                })
            });

        } catch (error) {
            console.error(error);
        }
    }

    async handleLeave() {
        try {
            this.setState({
                joined: false,
                remote: false
            })
            rtc.localAudioTrack.close();
            rtc.localVideoTrack.close();

            await rtc.client.leave();

            this.props.closeVideo();
        } catch (err) {
            console.error(err);
        }
    }

    render() {
        return (
            <div>
                <div id='chatButtons'>
                    <IconButton onClick={this.handleLeave} >
                        <PhoneDisabledIcon/>
                    </IconButton>            
                </div>
            
                {this.state.joined ? 
                    <div>
                        <div>{this.props.fromName}</div>
                        <div id="local-stream" className="stream local-stream"></div>
                    </div>
                :
                    null
                }

                {this.state.remote ? 
                    <div>
                        <br></br>
                        <div>{this.props.toName}</div>
                        <div id="remote-stream" className="stream remote-stream"></div> 
                    </div>
                :   
                    <div id='awaiting'>
                        <br></br>
                        <h3>Awaiting User to Join Call</h3>
                    </div>
                }

            </div>
        )
    };
}

export default VideoChat;