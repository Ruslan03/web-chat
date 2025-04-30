"use client"

import React, { Suspense, useState } from 'react'
import { Button } from '@/components/ui/button'

import dynamic from 'next/dynamic'
import Link from 'next/link'

const VoiceCallRoom = dynamic(() => import('./components/voice-call-room'), {
  ssr: false,
})

const Page = () => {
  const [isStart, setIsStart] = useState(false)
  const username = typeof localStorage !== 'undefined' && localStorage.getItem('username')
  
  return (
    <div className='flex items-center justify-center h-full'>
      {!isStart && (
        <div className='flex flex-col gap-4'>
        <Button onClick={() => setIsStart(true)}>Mulai Panggilan Suara</Button>
        <Button asChild variant={'outline'}>
          <Link href={'/chat-room'}>Kembali ke chat room</Link>
        </Button>
        </div>
      )}

      {isStart && username && (
        <Suspense fallback={'loading...'}>
          <VoiceCallRoom userName={username} onClose={() => setIsStart(false)} />
        </Suspense>
      )}
    </div>
  )
}

export default Page