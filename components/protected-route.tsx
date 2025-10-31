"use client"

import type React from "react"

import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

interface ProtectedRouteProps {
  children: React.ReactNode
  adminOnly?: boolean
}

export function ProtectedRoute({ children, adminOnly = false }: ProtectedRouteProps) {
  const { isAuthenticated, isAdmin, user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
      return
    }

    if (adminOnly && !isAdmin) {
      router.push("/")
    }
  }, [isAuthenticated, isAdmin, adminOnly, router])

  if (!isAuthenticated) {
    return null
  }

  if (adminOnly && !isAdmin) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground">Acesso Negado</h2>
          <p className="mt-2 text-muted-foreground">Você não tem permissão para acessar esta página.</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
