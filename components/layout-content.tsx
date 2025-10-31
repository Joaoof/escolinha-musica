"use client"

import type React from "react"

import { usePathname } from "next/navigation"
import { Sidebar } from "@/components/sidebar"
import { Footer } from "@/components/footer"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { isAuthenticated } = useAuth()
  const router = useRouter()
  const isLoginPage = pathname === "/login"
  const isPublicPage = isLoginPage || pathname === "/termos" || pathname === "/privacidade" || pathname === "/seguranca"

  useEffect(() => {
    if (!isAuthenticated && !isPublicPage) {
      router.push("/login")
    }
    if (isAuthenticated && isLoginPage) {
      router.push("/")
    }
  }, [isAuthenticated, isPublicPage, isLoginPage, router])

  if (isPublicPage) {
    return (
      <div className="flex min-h-screen flex-col">
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    )
  }

  // Show protected content with sidebar
  if (!isAuthenticated) {
    return null // Will redirect in useEffect
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
      <Footer />
    </div>
  )
}
