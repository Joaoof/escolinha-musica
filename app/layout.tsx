import type React from "react"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { LayoutContent } from "@/app/layout-content"
import { AuthProvider } from "@/contexts/auth-context"

const geistSans = Geist({
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${geistSans.className} ${geistMono.className} antialiased`}>
        <AuthProvider>
          <LayoutContent>{children}</LayoutContent>
        </AuthProvider>
      </body>
    </html>
  )
}
