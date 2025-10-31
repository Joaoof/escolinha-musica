import type { IAuthService } from "../interfaces/IAuthService"
import type { LoginRequestDto, LoginResponseDto } from "@/dtos/auth.dto"
import type { User } from "@/lib/types"
import { apiClient } from "@/api/api-client"

export class HttpAuthService implements IAuthService {
  async login(dto: LoginRequestDto): Promise<LoginResponseDto> {
    const response = await apiClient.post<LoginResponseDto>("/auth/login", dto)

    // Save token to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("auth_token", response.data.token)
      localStorage.setItem("auth_user", JSON.stringify(response.data.user))
    }

    return response.data
  }

  async logout(): Promise<void> {
    try {
      await apiClient.post("/auth/logout", {})
    } finally {
      if (typeof window !== "undefined") {
        localStorage.removeItem("auth_token")
        localStorage.removeItem("auth_user")
      }
    }
  }

  getCurrentUser(): User | null {
    if (typeof window === "undefined") return null
    const userData = localStorage.getItem("auth_user")
    if (!userData) return null

    const user = JSON.parse(userData)
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      password: "", // Don't store password
      studentId: user.studentId,
    }
  }

  async refreshToken(): Promise<string> {
    const response = await apiClient.post<{ token: string }>("/auth/refresh", {})
    if (typeof window !== "undefined") {
      localStorage.setItem("auth_token", response.data.token)
    }
    return response.data.token
  }

  isAuthenticated(): boolean {
    if (typeof window === "undefined") return false
    return !!localStorage.getItem("auth_token")
  }
}
