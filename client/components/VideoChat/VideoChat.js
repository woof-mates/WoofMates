import React from "react";
import ReactDOM from "react-dom";
import AgoraRTC from 'agora-rtc-sdk-ng';

const rtc = { 
    client: null,
    localAudioTrack: null,
    localVideoTrack: null
};

const options = {
    appId: '9fd5c87c7e6a4e659acff6443d6edbeb',
    channel: 'DogMates',
    uid: null,
    token: '0069fd5c87c7e6a4e659acff6443d6edbebIACVikO5YwSABmHAldK+RXPXMA4MFDKC9sbG8B/QDKDigOZjfQEAAAAAEADAccLptkvqXwEAAQC2S+pf'
}

class VideoChat extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            joined: false,
        }
        this.remoteRef = React.createRef("");
        this.leaveRef = React.createRef("");

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleLeave = this.handleLeave.bind(this)
    }
    

    async handleSubmit(e) {
        try {
            this.setState({
                joined: true
            })

            rtc.client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
            const uid = await rtc.client.join(
                options.appId,
                options.channel,
                options.token,
                null
            );

            rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
            rtc.localVideoTrack = await AgoraRTC.createCameraVideoTrack();
            rtc.localVideoTrack.play("local-stream");
            rtc.client.on("user-published", async (user, mediaType) => {
                await rtc.client.subscribe(user, mediaType);
                if (mediaType === "video" || mediaType === "all") {
                    const remoteVideoTrack = user.videoTrack;

                    const PlayerContainer = React.createElement("div", {
                        id: user.uid,
                        className: "stream",
                    });

                    ReactDOM.render(
                        PlayerContainer,
                        document.getElementById("remote-stream")
                    );

                    user.videoTrack.play(`${user.uid}`);
                }

                if (mediaType === "audio" || mediaType === "all") {
                    const remoteAudioTrack = user.audioTrack;
                    remoteAudioTrack.play();
                }
            });

            rtc.client.on("user-unpublished", (user) => {
                const playerContainer = document.getElementById(user.uid);
                playerContainer.remove();
            });

            await rtc.client.publish([rtc.localAudioTrack, rtc.localVideoTrack]);

        } catch (error) {
            console.error(error);
        }
    }

    async handleLeave() {
        try {
            const localContainer = document.getElementById("local-stream");

            rtc.localAudioTrack.close();
            rtc.localVideoTrack.close();

            this.setState({
                joined: false
            })

            localContainer.textContent = "";

            rtc.client.remoteUsers.forEach((user) => {
                const playerContainer = document.getElementById(user.uid);
                playerContainer && playerContainer.remove();
            });

            await rtc.client.leave();
        } catch (err) {
            console.error(err);
        }
    }

    render() {
        return (
            <>
                <div className="container">
                    <input
                    type="submit"
                    value="Join"
                    onClick={this.handleSubmit}
                    disabled={this.state.joined ? true : false}
                    />
                    <input
                    type="button"
                    ref={this.leaveRef}
                    value="Leave"
                    onClick={this.handleLeave}
                    disabled={this.state.joined ? false : true}
                    />
                </div>
                
                <div>
                    <div id="local-stream" className="stream local-stream"></div>
                    <div id="remote-stream" ref={this.remoteRef} className="stream remote-stream"></div>
                </div>

            </>
        )
    };
}

export default VideoChat;