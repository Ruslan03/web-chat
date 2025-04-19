'use client'

import React, { useRef, useState } from 'react'
import supabase from '../../../lib/supabase'
import { Button } from '@/components/ui/button'

export default function VoiceRecorder() {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const [recording, setRecording] = useState(false)
  const [audioURL, setAudioURL] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)

  const handleStart = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    const recorder = new MediaRecorder(stream)
    const chunks: Blob[] = []

    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        chunks.push(e.data)
      }
    }

    recorder.onstop = async () => {
      const blob = new Blob(chunks, { type: 'audio/webm' })
      const fileName = `recording-${Date.now()}.webm`

      setAudioURL(URL.createObjectURL(blob))
      setUploading(true)

      const { error, data } = await supabase.storage
        .from('voice-recordings')
        .upload(fileName, blob, {
          contentType: 'audio/webm',
        })

      setUploading(false)

      if (error) {
        console.error('Upload error:', error.message)
      } else {
        console.log('data', data)

        const username = localStorage.getItem('username') || 'anon'

        const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string

        const audio_path = `${baseUrl}/storage/v1/object/public/${data?.fullPath}`

        await supabase.from('messages').insert({
          message: '[AUDIO]',
          user_name: username,
          audio_path,
          type: 'audio'
        })

        if (error) {
          console.error('Error sending message:', error)
        }
      }
    }

    recorder.start()
    mediaRecorderRef.current = recorder
    setRecording(true)
  }

  const handleStop = () => {
    mediaRecorderRef.current?.stop()
    setRecording(false)
  }

  return (
    <Button variant={recording ? 'destructive' : 'default'} disabled={uploading} onClick={recording ? handleStop : handleStart} className={`${!recording && 'bg-zinc-800'} rounded-full text-lg`}>

      {!uploading && (
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M480-400q-50 0-85-35t-35-85v-240q0-50 35-85t85-35q50 0 85 35t35 85v240q0 50-35 85t-85 35Zm0-240Zm-40 520v-123q-104-14-172-93t-68-184h80q0 83 58.5 141.5T480-320q83 0 141.5-58.5T680-520h80q0 105-68 184t-172 93v123h-80Zm40-360q17 0 28.5-11.5T520-520v-240q0-17-11.5-28.5T480-800q-17 0-28.5 11.5T440-760v240q0 17 11.5 28.5T480-480Z" /></svg>
      )}

      {uploading && (

        <svg className='animate-spin' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-155.5t86-127Q252-817 325-848.5T480-880q17 0 28.5 11.5T520-840q0 17-11.5 28.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160q133 0 226.5-93.5T800-480q0-17 11.5-28.5T840-520q17 0 28.5 11.5T880-480q0 82-31.5 155t-86 127.5q-54.5 54.5-127 86T480-80Z" /></svg>
      )}
    </Button>
  )
}
