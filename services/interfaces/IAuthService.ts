import type { LoginRequestDto, LoginResponseDto } from "@/dtos/auth.dto"
import type { User } from "@/lib/types"

export interface IAuthService {
  login(dto: LoginRequestDto): Promise<LoginResponseDto>
  logout(): Promise<void>
  getCurrentUser(): User | null
  refreshToken(): Promise<string>
  isAuthenticated(): boolean
}
