'use client'

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"

const ChatHeader = ({ title, hideVoiceCallButton }: { title?: string, hideVoiceCallButton?: boolean }) => {
    const router = useRouter()
    const username = typeof localStorage !== 'undefined' && localStorage.getItem('username')
    const handleLogout = () => {
        localStorage.removeItem('username')

        router.replace('/')
    }
    return (
        <div className='w-full bg-gray-800 text-white flex items-center gap-3 py-4 border-b-2 border-zinc-400 px-5'>
            <div className="flex-1">
                <p className='font-semibold text-2xl'>{title || 'Chat Room'}</p>
                <p className='text-muted text-sm'>Masuk sebagai: {username}</p>
            </div>
            {!hideVoiceCallButton && (
                <Button asChild variant={'secondary'}>
                    <Link href={'/voice-call'}>Panggilan Suara</Link>
                </Button>
            ) }
            <Button onClick={handleLogout} variant={'destructive'}>Keluar</Button>
        </div>
    )
}

export default ChatHeader