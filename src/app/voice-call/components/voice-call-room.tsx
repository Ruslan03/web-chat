"use client"

import {
    LocalUser,
    RemoteUser,
    useIsConnected,
    useJoin,
    useLocalMicrophoneTrack,
    usePublish,
    useRemoteUsers,
} from "agora-rtc-react";
import { useState } from "react";
import AgoraRTC, { AgoraRTCProvider } from "agora-rtc-react";


const VoiceCallRoom = ({ userName }: { userName: string }) => {
    const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
    return (
        <AgoraRTCProvider client={client}>
            <Basics userName={userName} />
        </AgoraRTCProvider>
    );
}

const Basics = ({ userName }: { userName: string }) => {
    const [calling, setCalling] = useState(false);
    const isConnected = useIsConnected(); // Store the user's connection status
    const appId = '2149f9f1dca9418fa37bc97a359bd711'
    const channel = 'voice-room-channel';
    const token = null;
    const [micOn, setMic] = useState(true);

    const { localMicrophoneTrack } = useLocalMicrophoneTrack(micOn);

    const uid = userName?.replace(/\s+/g, "_") + '-' + Math.floor(Math.random() * 1000);

    useJoin({ appid: appId, channel: channel, token: token ? token : null, uid }, calling);
    usePublish([localMicrophoneTrack]);

    const remoteUsers = useRemoteUsers();

    return (
        <>
            <div>
                {isConnected ? (
                    <div>
                        <div>
                            <LocalUser
                                audioTrack={localMicrophoneTrack}
                                playAudio={false} // Plays the local user's audio track. You use this to test your mic before joining a channel.
                                micOn={micOn}
                            >
                                <p>You</p>
                            </LocalUser>
                        </div>
                        {remoteUsers.map((user) => (
                            <div key={user.uid}>
                                <p>{user.uid}</p>
                                {/* <RemoteUser user={user}>
                </RemoteUser> */}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div>
                        <button
                            disabled={!appId || !channel}
                            onClick={() => setCalling(true)}
                        >
                            <span>Mulai Voice Call</span>
                        </button>
                    </div>
                )}
            </div>
            {isConnected && (
                <div style={{ padding: "20px" }}>
                    <div>
                        <button onClick={() => setMic(a => !a)}>
                            {micOn ? "Disable mic" : "Enable mic"}
                        </button>
                        <button
                            onClick={() => setCalling(a => !a)}
                        >
                            {calling ? "End calling" : "Start calling"}
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default VoiceCallRoom;
