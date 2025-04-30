"use client"

import React, { Suspense, useState } from 'react'
import { Button } from '@/components/ui/button'

import dynamic from 'next/dynamic'

const VoiceCallRoom = dynamic(() => import('./components/voice-call-room'), {
  ssr: false,
})

const Page = () => {
  const [isStart, setIsStart] = useState(false)
  return (
    <div>

      <Button onClick={() => setIsStart(true)}>Mulai Voice Call</Button>

      {isStart && (
        <Suspense fallback={'loading...'}>

          <VoiceCallRoom />
        </Suspense>
      )}
    </div>
  )
}

export default Page