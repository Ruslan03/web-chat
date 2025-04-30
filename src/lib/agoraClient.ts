import AgoraRTC from 'agora-rtc-sdk-ng';

const createClient = () => {
  return AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });
};

const createStream = (videoElement: HTMLVideoElement, stream: any) => {
  stream.play(videoElement);
};

export { createClient, createStream };
