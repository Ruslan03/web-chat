'use client'

import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import supabase from '../../../lib/supabase'

const ChatBox = () => {
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSend = async () => {
        if (!message.trim()) return

        const username = localStorage.getItem('username') || 'anon'

        setLoading(true)
        const { error } = await supabase.from('messages').insert({
            message,
            user_name: username,
        })

        if (error) {
            console.error('Error sending message:', error)
        } else {
            setMessage('') // reset input
        }

        setLoading(false)
    }

    const handleKeyDown = (e: any) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSend()
        }
    }
    return (
        <div className='flex px-3 py-5'>
            <div className="w-full mt-4 p-1 sm:p-2 flex gap-2 justify-between bg-gray-950 border-2 border-gray-700 rounded-full">
                <Input type="text" value={message} onChange={(e) => setMessage(e.target.value)} onKeyDown={handleKeyDown} className="flex-1 bg-transparent md:text-lg focus-visible:ring-transparent text-white border-0 text-lg placeholder:text-lg " placeholder="Ketik Pesan" />
                <Button disabled={!message.length || loading} onClick={handleSend} className="bg-zinc-800 rounded-full text-lg">
                    <div className="flex items-center gap-2">
                        <p>Kirim</p>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z" /></svg>
                    </div>
                </Button>

            </div>
        </div>
    )
}

export default ChatBox