export interface LoginRequestDto {
  email: string
  password: string
}

export interface LoginResponseDto {
  user: {
    id: string
    email: string
    name: string
    role: string
    studentId?: string
  }
  token: string
  expiresIn: number
}

export interface RefreshTokenDto {
  refreshToken: string
}
