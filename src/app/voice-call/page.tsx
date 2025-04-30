"use client"

import React, { useState } from 'react'
import VoiceCallRoom from './components/voice-call-room'
import { Button } from '@/components/ui/button'

const Page = () => {
  const [isStart, setIsStart] = useState(false)
  return (
    <div>

      <Button onClick={() => setIsStart(true)}>Mulai Voice Call</Button>

      {isStart && (

      <VoiceCallRoom />
      )}
    </div>
  )
}

export default Page