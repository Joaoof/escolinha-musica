import type { IAuthService } from "../interfaces/IAuthService"
import type { LoginRequestDto, LoginResponseDto } from "@/dtos/auth.dto"
import type { User } from "@/lib/types"
import { authenticateUser, saveAuthUser, getAuthUser, clearAuthUser } from "@/lib/auth-store"

export class MockAuthService implements IAuthService {
  async login(dto: LoginRequestDto): Promise<LoginResponseDto> {
    const user = authenticateUser(dto.email, dto.password)
    if (!user) {
      throw new Error("Invalid credentials")
    }

    saveAuthUser(user)

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        studentId: user.studentId,
      },
      token: `mock-token-${user.id}`,
      expiresIn: 3600,
    }
  }

  async logout(): Promise<void> {
    clearAuthUser()
  }

  getCurrentUser(): User | null {
    return getAuthUser()
  }

  async refreshToken(): Promise<string> {
    return `mock-refreshed-token-${Date.now()}`
  }

  isAuthenticated(): boolean {
    return getAuthUser() !== null
  }
}
