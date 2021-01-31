import AgoraRTC from 'agora-rtc-sdk-ng';

const rtc = { 
    client: null,
    localAudioTrack: null,
    localVideoTrack: null
};

const options = {
    appId: '9fd5c87c7e6a4e659acff6443d6edbeb',
    channel: 'DogMates',
    token: '0069fd5c87c7e6a4e659acff6443d6edbebIAA0Lbi/zTxiCV/P1XuQ6h0PnPXE0xYNO9EtG4C+syfqTOZjfQEAAAAAEABI+NBceGwYYAEAAQB4bBhg'
}

export {rtc, options}