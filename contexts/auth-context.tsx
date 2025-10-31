"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { authenticateUser, saveAuthUser, getAuthUser, clearAuthUser } from "@/lib/auth-store"
import type { User, AuthContextType } from "@/lib/types"

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing auth on mount
    const existingUser = getAuthUser()
    if (existingUser) {
      setUser(existingUser)
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    const authenticatedUser = authenticateUser(email, password)
    if (authenticatedUser) {
      setUser(authenticatedUser)
      saveAuthUser(authenticatedUser)
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
    clearAuthUser()
  }

  const value: AuthContextType = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin",
    isStudent: user?.role === "student",
  }

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-muted-foreground">Carregando...</div>
      </div>
    )
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
