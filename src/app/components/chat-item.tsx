import React from 'react'

const ChatItem = (props: any) => {
    const { message, user_name, type , audio_path} = props.data
    const username = typeof localStorage !== 'undefined' && localStorage.getItem('username')
    const isMe = user_name === username
    return (
        <div className={`flex w-full mt-2 ${isMe ? 'justify-end': 'justify-start'}`}>
            <div className={`${isMe ? 'bg-gradient-to-r from-purple-800 to-purple-800': 'bg-gradient-to-br from-gray-800 to-gray-900'} p-3 rounded-md`}>
                {type === 'audio' ?  (
                    <audio src={audio_path} controls>
                    Your browser does not support the audio element.
                    </audio>
                ): (
                    <>
                        <div className='text-muted text-xs'><p>{user_name}</p></div>
                        <p className='text-lg'>{message}</p>
                    </>
                )}
            </div>
        </div>
    )
}

export default ChatItem