"use client"

import React, { Suspense, useState } from 'react'
import { Button } from '@/components/ui/button'

import dynamic from 'next/dynamic'

const VoiceCallRoom = dynamic(() => import('./components/voice-call-room'), {
  ssr: false,
})

const Page = () => {
  const [isStart, setIsStart] = useState(false)
  const username = typeof localStorage !== 'undefined' && localStorage.getItem('username')
  
  return (
    <div className='flex items-center justify-center h-full'>
      {!isStart && (
        <Button onClick={() => setIsStart(true)}>Mulai Panggilan Suara</Button>
      )}

      {isStart && username && (
        <Suspense fallback={'loading...'}>
          <VoiceCallRoom userName={username} />
        </Suspense>
      )}
    </div>
  )
}

export default Page