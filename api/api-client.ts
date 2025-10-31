export interface ApiConfig {
  baseUrl: string
  timeout: number
  headers?: Record<string, string>
}

export interface ApiResponse<T> {
  data: T
  status: number
  message?: string
}

export interface ApiError {
  message: string
  status: number
  errors?: Record<string, string[]>
}

class ApiClient {
  private config: ApiConfig

  constructor(config: ApiConfig) {
    this.config = config
  }

  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...this.config.headers,
    }

    // Add auth token if available
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("auth_token")
      if (token) {
        headers["Authorization"] = `Bearer ${token}`
      }
    }

    return headers
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    const response = await fetch(`${this.config.baseUrl}${endpoint}`, {
      method: "GET",
      headers: this.getHeaders(),
    })

    if (!response.ok) {
      throw await this.handleError(response)
    }

    const data = await response.json()
    return {
      data,
      status: response.status,
    }
  }

  async post<T>(endpoint: string, body: any): Promise<ApiResponse<T>> {
    const response = await fetch(`${this.config.baseUrl}${endpoint}`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      throw await this.handleError(response)
    }

    const data = await response.json()
    return {
      data,
      status: response.status,
    }
  }

  async put<T>(endpoint: string, body: any): Promise<ApiResponse<T>> {
    const response = await fetch(`${this.config.baseUrl}${endpoint}`, {
      method: "PUT",
      headers: this.getHeaders(),
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      throw await this.handleError(response)
    }

    const data = await response.json()
    return {
      data,
      status: response.status,
    }
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    const response = await fetch(`${this.config.baseUrl}${endpoint}`, {
      method: "DELETE",
      headers: this.getHeaders(),
    })

    if (!response.ok) {
      throw await this.handleError(response)
    }

    const data = response.status !== 204 ? await response.json() : null
    return {
      data,
      status: response.status,
    }
  }

  private async handleError(response: Response): Promise<ApiError> {
    let errorData: any
    try {
      errorData = await response.json()
    } catch {
      errorData = { message: response.statusText }
    }

    return {
      message: errorData.message || "An error occurred",
      status: response.status,
      errors: errorData.errors,
    }
  }
}

// API Client instance - configure with your C# backend URL
export const apiClient = new ApiClient({
  baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
  timeout: 30000,
})
