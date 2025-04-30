"use client"

import {
    LocalUser,
    RemoteUser,
    // RemoteUser,
    useIsConnected,
    useJoin,
    useLocalMicrophoneTrack,
    usePublish,
    useRemoteUsers,
} from "agora-rtc-react";
import { useEffect, useState } from "react";
import AgoraRTC, { AgoraRTCProvider } from "agora-rtc-react";
import { decryptUIDToName, encryptNameToUID } from "@/lib/encryptName";
import { Button } from "@/components/ui/button";
import ChatHeader from "@/app/components/chat-header";


const VoiceCallRoom = ({ userName, onClose }: { userName: string, onClose: VoidFunction }) => {
    const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
    return (
        <AgoraRTCProvider client={client}>
            <Basics userName={userName} onClose={onClose} />
        </AgoraRTCProvider>
    );
}

const Basics = ({ userName, onClose }: { userName: string, onClose: VoidFunction }) => {
    const [calling, setCalling] = useState(false);
    const isConnected = useIsConnected(); // Store the user's connection status
    const appId = '2149f9f1dca9418fa37bc97a359bd711'
    const channel = 'voice-room-channel';
    const token = null;
    const [micOn, setMic] = useState(true);

    const { localMicrophoneTrack } = useLocalMicrophoneTrack(micOn);

    const uid = encryptNameToUID(userName)

    useJoin({ appid: appId, channel: channel, token: token ? token : null, uid }, calling);
    usePublish([localMicrophoneTrack]);

    const remoteUsers = useRemoteUsers();

    useEffect(() => {
        setCalling(true)
    }, [])


    return (
        <div className="w-full h-full flex flex-col">
            <ChatHeader title="Panggilan Suara" hideVoiceCallButton={true} />
            {isConnected ? (
                <div className="grid grid-cols-2 gap-3 w-full p-3">

                    <div className="h-64 shadow-accent rounded-lg bg-gray-200">
                        <LocalUser
                            audioTrack={localMicrophoneTrack}
                            playAudio={false} // Plays the local user's audio track. You use this to test your mic before joining a channel.
                            micOn={micOn}
                            style={{ backgroundColor: 'unset', height:'216px' }}
                        >
                            <div className="h-full w-full flex flex-col items-center justify-around">

                                <p>You</p>
                                <div className="h-20 w-20 rounded-full bg-zinc-300 flex items-center justify-center">
                                    <p className="font-bold text-2xl">{userName?.charAt(0).toUpperCase()}</p>
                                </div>
                                <div>
                                    <p className="font-semibold">{userName}</p>
                                    <p className="text-sm text-gray-600 text-center">You</p>
                                </div>
                            </div>
                        </LocalUser>
                    </div>

                    {remoteUsers.map((user) => {
                        const uname = decryptUIDToName(user.uid as string)
                        return (
                            <div key={user.uid} className="h-52 shadow-accent rounded-lg bg-gray-200">
                                <RemoteUser user={user} style={{ backgroundColor: 'unset', height:'216px' }}>
                                    <div  className="h-full w-full flex flex-col items-center justify-around">

                                        <div className="h-20 w-20 rounded-full bg-zinc-300 flex items-center justify-center">
                                            <p className="font-bold text-2xl">{uname?.charAt(0).toUpperCase()}</p>
                                        </div>
                                        <p className="font-semibold">{uname}</p>
                                    </div>
                                </RemoteUser>
                            </div>
                        )
                    })}
                </div>
            ) : (
                <div className="w-full h-full flex items-center justify-center">
                    <p>Menghubungkan...</p>
                </div>
            )}

            {isConnected && (
                <div className="p-4 absolute bottom-0 w-full flex items-center justify-center gap-2">
                    <Button onClick={() => setMic(a => !a)}>
                        {micOn ? "Mute" : "Unmute"}
                    </Button>
                    <Button
                        variant={'destructive'}
                        onClick={() => {
                            setCalling(false)
                            onClose()
                        }}
                    >
                        Tutup panggilan
                    </Button>
                </div>
            )}
        </ div>
    );
};

export default VoiceCallRoom;
