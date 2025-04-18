'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Home = () => {
  const router = useRouter()
  const [name, setName] = useState('')

  const handleChangeName = (e: any) => setName(e.target.value)

  const handleLogin = () => {
    localStorage.setItem('username', name);
    router.push('/chat-room')
  }

  useEffect(() => {
    const logedName = localStorage.getItem('username')

    if(logedName) {
      router.push('/chat-room')
    }
  }, [])


  return (
    <div className="flex flex-col gap-4 h-full items-center justify-center px-4 ">
      <h1 className="text-xl sm:text-3xl font-bold text-center -mt-24 text-white">Hai,<br /> {`Selamat datang kembali :)`}</h1>

      <div className="w-full sm:w-3/4 mt-4 p-1 sm:p-2 flex gap-2 justify-between bg-gray-950 border-2 border-gray-700 rounded-full">
        <Input type="text" value={name} onChange={handleChangeName} className="flex-1 bg-transparent md:text-lg focus-visible:ring-transparent text-white border-0 text-lg placeholder:text-lg " placeholder="Masukan nama anda..." />
        <Button disabled={!name.length} onClick={handleLogin} className="bg-zinc-800 rounded-full text-lg">
          <div className="flex items-center gap-2">
            <p>Masuk</p>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-32 h-32" height="32" viewBox="0 -960 960 960" width="32" fill="#e3e3e3"><path d="m480-320 160-160-160-160-56 56 64 64H320v80h168l-64 64 56 56Zm0 240q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" /></svg>
          </div>
        </Button>

      </div>
    </div>
  );
}

export default Home