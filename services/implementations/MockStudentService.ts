import type { IStudentService } from "../interfaces/IStudentService"
import type { CreateStudentDto, UpdateStudentDto, StudentResponseDto } from "@/dtos/student.dto"
import { studentStore } from "@/lib/student-store"
import type { Student } from "@/lib/types"

export class MockStudentService implements IStudentService {
  private mapToDto(student: Student): StudentResponseDto {
    return {
      id: student.id,
      name: student.name,
      email: student.email,
      phone: student.phone,
      age: student.age,
      instrument: student.instrument,
      experienceLevel: student.experienceLevel,
      goals: student.goals,
      availableForGroup: student.availableForGroup,
      packageType: student.packageType,
      monthlyFee: student.monthlyFee,
      enrollmentDate: student.enrollmentDate,
      paymentStatus: student.paymentStatus,
      lastPaymentDate: student.lastPaymentDate,
      overdueMonths: student.overdueMonths,
    }
  }

  async getAll(): Promise<StudentResponseDto[]> {
    const students = studentStore.getStudents()
    return students.map(this.mapToDto)
  }

  async getById(id: string): Promise<StudentResponseDto | null> {
    const student = studentStore.getStudent(id)
    return student ? this.mapToDto(student) : null
  }

  async create(dto: CreateStudentDto): Promise<StudentResponseDto> {
    const student = studentStore.addStudent({
      ...dto,
      enrollmentDate: new Date().toISOString().split("T")[0],
      paymentStatus: "Pendente",
      lastPaymentDate: "",
      overdueMonths: 0,
    })
    return this.mapToDto(student)
  }

  async update(id: string, dto: UpdateStudentDto): Promise<StudentResponseDto> {
    studentStore.updateStudent(id, dto)
    const updated = studentStore.getStudent(id)
    if (!updated) throw new Error("Student not found")
    return this.mapToDto(updated)
  }

  async delete(id: string): Promise<void> {
    studentStore.deleteStudent(id)
  }

  async search(query: string): Promise<StudentResponseDto[]> {
    const students = studentStore.getStudents()
    const filtered = students.filter(
      (s) => s.name.toLowerCase().includes(query.toLowerCase()) || s.email.toLowerCase().includes(query.toLowerCase()),
    )
    return filtered.map(this.mapToDto)
  }

  async getByInstrument(instrument: string): Promise<StudentResponseDto[]> {
    const students = studentStore.getStudents()
    const filtered = students.filter((s) => s.instrument === instrument)
    return filtered.map(this.mapToDto)
  }

  async getByPaymentStatus(status: string): Promise<StudentResponseDto[]> {
    const students = studentStore.getStudents()
    const filtered = students.filter((s) => s.paymentStatus === status)
    return filtered.map(this.mapToDto)
  }
}
