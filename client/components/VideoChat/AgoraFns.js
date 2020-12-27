import AgoraRTC from "agora-rtc-sdk-ng"

const rtc = { 
    client: null,
    joined: false,
    published: false,
    localStream: null,
    remoteStreams: [],
    params: {}
};

const option = {
    appID: '9fd5c87c7e6a4e659acff6443d6edbeb',
    channel: 'DogMates',
    uid: null,
    token: null
}

const addView = (id, show) => {
    return (
        <div id={`remote_video_panel_${id}`} className='video-view'>,
            <div id={`remote_video_${id}`} className='video-placeholder'></div>
            <div id={`remote_video_info_${id}`} className={`video-profile ${show ? '' : 'hide'}`}></div>
            <div id={`video_autoplay_${id}`} className='autoplay-fallback hide'></div>
        </div>
    )
}

export const joinCall = () => {
    rtc.client = AgoraRTC.createClient({ mode: "live", codec: "vp8" });

    rtc.client.init(option.appID, function() {
        console.log('init success');
        rtc.client.join(option.token, option.channel, option.uid, function() {
            console.log('join channel: ' + option.channel + ' success, uid: ' + option.uid);
            rtc.params.uid = option.uid; 
            rtc.localStream = AgoraRTC.createStream({
                streamID: rtc.params.uid,
                audio: false,
                video: true,
                screen: false
            })

            rtc.localStream.init(function() {
                console.log('init local stream success');
                rtc.localStream.play('local_stream');
                rtc.client.publish(rtc.localStream, function(err) {
                    console.log('publish failed');
                    console.error(err);
                })
            }, function (err) {
                console.log('init local stream failed', err)
            })
        }, (err) => {
            console.error(err)
        });
    });

    rtc.client.on('stream-added', function(event) {
        const remoteStream = event.stream;
        const id = remoteStream.getId();
        if (id !== rtc.params.uid) {
            rtc.client.subscribe(remoteStream, function(err) {
                console.log('stream subscribe failed', err);
            })
        }
        console.log('stream-added remote-uid: ', id);
    })

    rtc.client.on('stream-subscribed', function(event) {
        const remoteStream = event.stream;
        const id = remoteStream.getId();
        addView(id);
        remoteStream.play('remote_video_' + id);
    })

    rtc.client.on('stream-removed', function(event) {
        const remoteStream = event.stream;
        const id = remoteStream.getId();
        remoteStream.stop('remote_video_' + id);
        removeView(id);
        console.log('stream-removed remote-uid: ', id);
    })
}

export const leaveCall = () => {
    rtc.client.leave(function () {
        rtc.localStream.stop();
        rtc.localStream.close();
        while (rtc.remoteStreams.length > 0) {
            const stream = rtc.remoteStreams.shift();
            const id = stream.getId();
            stream.stop();
            removeView(id);
        }
        console.log('client leaves channel success');
    }, function(err) {
        console.log('channel leave failed');
        console.error(err);
    });
}

