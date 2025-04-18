'use client'

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

const ChatHeader = () => {
    const router = useRouter()
    const username = typeof localStorage !== 'undefined' && localStorage.getItem('username')
    const handleLogout = () => {
        localStorage.removeItem('username')

        router.replace('/')
    }
    return (
        <div className='w-full bg-gray-800 text-white flex items-center py-4 border-b-2 border-zinc-400 px-5'>
            <div className="flex-1">
            <p className='font-semibold text-2xl'>Chat Room</p>
            <p className='text-muted text-sm'>Masuk sebagai: {username}</p>
            </div>
            <Button onClick={handleLogout} variant={'destructive'}>Keluar</Button>
        </div>
    )
}

export default ChatHeader