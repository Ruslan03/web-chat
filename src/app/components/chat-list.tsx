'use client'

import React, { useEffect, useState } from 'react'
import ChatBox from './chat-box';
import supabase from '../../../lib/supabase';
import ChatHeader from './chat-header';
import ChatItem from './chat-item';

const ChatList = () => {
  const username = typeof localStorage !== 'undefined' && localStorage.getItem('username')
  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase.from('messages')
        .select('*')

      if (error) {
        setIsLoading(false)
        console.error('Error fetching data:', error);
      } else {
        setIsLoading(false)
        setData(data);
      }
    }

    fetchData();

    const channel = supabase
      .channel('realtime-messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT', // bisa juga 'INSERT' | 'UPDATE' | 'DELETE'
          schema: 'public',
          table: 'messages',
        },
        (payload: any) => {
          setData((currentData: any) => ([
            ...currentData,
            payload?.new
          ]))
        }
      )
      .subscribe()

    // Cleanup
    return () => {
      supabase.removeChannel(channel)
    }
  }, []);

  return (
    <div className='h-full flex flex-col'>
      <ChatHeader />
      <div className='flex-1 flex flex-col p-4 min-h-0 overflow-y-auto'>

        {isLoading && (
          <div className='flex-1 flex items-center justify-center'>
            <p className='text-white'>Loading...</p>
          </div>
        )}

        {!isLoading && (
          <div className='flex-1 text-white'>
            {data.map((chat: any) => <ChatItem key={chat?.id} data={chat} username={username} />)}
          </div>
        )}
      </div>
      <ChatBox />
    </div>
  )
}

export default ChatList