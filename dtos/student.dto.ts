export interface CreateStudentDto {
  name: string
  email: string
  phone: string
  age: number
  instrument: string
  experienceLevel: string
  goals: string
  availableForGroup: boolean
  packageType: string
  monthlyFee: number
}

export interface UpdateStudentDto {
  name?: string
  email?: string
  phone?: string
  age?: number
  instrument?: string
  experienceLevel?: string
  goals?: string
  availableForGroup?: boolean
  packageType?: string
  monthlyFee?: number
  paymentStatus?: string
  lastPaymentDate?: string
  overdueMonths?: number
}

export interface StudentResponseDto {
  id: string
  name: string
  email: string
  phone: string
  age: number
  instrument: string
  experienceLevel: string
  goals: string
  availableForGroup: boolean
  packageType: string
  monthlyFee: number
  enrollmentDate: string
  paymentStatus: string
  lastPaymentDate: string
  overdueMonths: number
}

export interface StudentListResponseDto {
  students: StudentResponseDto[]
  total: number
  page: number
  pageSize: number
}
