import type { IStudentService } from "../interfaces/IStudentService"
import type { CreateStudentDto, UpdateStudentDto, StudentResponseDto } from "@/dtos/student.dto"
import { apiClient } from "@/api/api-client"

export class HttpStudentService implements IStudentService {
  async getAll(): Promise<StudentResponseDto[]> {
    const response = await apiClient.get<StudentResponseDto[]>("/students")
    return response.data
  }

  async getById(id: string): Promise<StudentResponseDto | null> {
    try {
      const response = await apiClient.get<StudentResponseDto>(`/students/${id}`)
      return response.data
    } catch (error: any) {
      if (error.status === 404) return null
      throw error
    }
  }

  async create(dto: CreateStudentDto): Promise<StudentResponseDto> {
    const response = await apiClient.post<StudentResponseDto>("/students", dto)
    return response.data
  }

  async update(id: string, dto: UpdateStudentDto): Promise<StudentResponseDto> {
    const response = await apiClient.put<StudentResponseDto>(`/students/${id}`, dto)
    return response.data
  }

  async delete(id: string): Promise<void> {
    await apiClient.delete(`/students/${id}`)
  }

  async search(query: string): Promise<StudentResponseDto[]> {
    const response = await apiClient.get<StudentResponseDto[]>(`/students/search?q=${query}`)
    return response.data
  }

  async getByInstrument(instrument: string): Promise<StudentResponseDto[]> {
    const response = await apiClient.get<StudentResponseDto[]>(`/students/by-instrument/${instrument}`)
    return response.data
  }

  async getByPaymentStatus(status: string): Promise<StudentResponseDto[]> {
    const response = await apiClient.get<StudentResponseDto[]>(`/students/by-payment-status/${status}`)
    return response.data
  }
}
