"use client"

import { createContext, useContext, type ReactNode } from "react"
import type { IStudentService } from "@/services/interfaces/IStudentService"
import type { IAuthService } from "@/services/interfaces/IAuthService"
import { serviceFactory } from "@/services/ServiceFactory"

interface ServiceContextType {
  studentService: IStudentService
  authService: IAuthService
}

const ServiceContext = createContext<ServiceContextType | undefined>(undefined)

export function ServiceProvider({ children }: { children: ReactNode }) {
  const services: ServiceContextType = {
    studentService: serviceFactory.getStudentService(),
    authService: serviceFactory.getAuthService(),
  }

  return <ServiceContext.Provider value={services}>{children}</ServiceContext.Provider>
}

export function useServices() {
  const context = useContext(ServiceContext)
  if (!context) {
    throw new Error("useServices must be used within ServiceProvider")
  }
  return context
}

// Individual hooks for convenience
export function useStudentService() {
  return useServices().studentService
}

export function useAuthService() {
  return useServices().authService
}
