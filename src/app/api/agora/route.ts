import { NextResponse } from 'next/server';

export async function GET() {
  const appID = process.env.AGORA_APP_ID; // Pastikan menyimpan App ID di .env
  const channelName = 'test-channel';
  const token = null; // Anda bisa menggunakan token dinamis jika perlu
  
  return NextResponse.json({ appID, channelName, token });
}
