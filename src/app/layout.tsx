import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "Demo chat app | Ruslan",
  description: "Demo chat app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script src="https://cdn.agora.io/sdk/web/AgoraRTCSDK-4.4.0.js"></script>
      </head>
      <body
        className={` antialiased`}
      >
        <div className="w-full lg:w-[730px] mx-auto h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
