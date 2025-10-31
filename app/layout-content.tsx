"use client"

import type React from "react"
import { Sidebar } from "@/components/sidebar"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return

    const authData = localStorage.getItem("music_school_auth")
    const isAuthenticated = !!authData
    const isLoginPage = pathname === "/login"

    // <CHANGE> Redirect to login if not authenticated
    if (!isAuthenticated && !isLoginPage) {
      router.push("/login")
    }
    // <CHANGE> Redirect to home if authenticated and on login page
    if (isAuthenticated && isLoginPage) {
      router.push("/")
    }
  }, [pathname, router, isClient])

  const isLoginPage = pathname === "/login"

  // <CHANGE> Show login page without sidebar
  if (isLoginPage) {
    return <>{children}</>
  }

  // <CHANGE> Show protected content with sidebar
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  )
}

export { LayoutContent }
