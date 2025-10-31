import type { CreateStudentDto, UpdateStudentDto, StudentResponseDto } from "@/dtos/student.dto"

export interface IStudentService {
  getAll(): Promise<StudentResponseDto[]>
  getById(id: string): Promise<StudentResponseDto | null>
  create(dto: CreateStudentDto): Promise<StudentResponseDto>
  update(id: string, dto: UpdateStudentDto): Promise<StudentResponseDto>
  delete(id: string): Promise<void>
  search(query: string): Promise<StudentResponseDto[]>
  getByInstrument(instrument: string): Promise<StudentResponseDto[]>
  getByPaymentStatus(status: string): Promise<StudentResponseDto[]>
}
