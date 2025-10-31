export type Instrument = "Guitarra" | "Teclado" | "Bateria" | "Violão" | "Contra-baixo"
export type ExperienceLevel = "Iniciante" | "Intermediário" | "Avançado"
export type PackageType = "Individual" | "Grupo"
export type PaymentStatus = "Pago" | "Pendente" | "Atrasado"

export interface Student {
  id: string
  name: string
  email: string
  phone: string
  age: number
  instrument: Instrument
  experienceLevel: ExperienceLevel
  objectives: string
  availableForGroup: boolean
  packageType: PackageType
  monthlyFee: number
  enrollmentDate: string
  lastPaymentDate: string | null
  paymentStatus: PaymentStatus
  overdueMonths: number
}

export interface Payment {
  id: string
  studentId: string
  amount: number
  dueDate: string
  paidDate: string | null
  status: PaymentStatus
  month: string
}

export interface DashboardStats {
  totalStudents: number
  activeStudents: number
  pendingPayments: number
  overduePayments: number
  monthlyRevenue: number
  expectedRevenue: number
}

export type UserRole = "admin" | "student"

export interface User {
  id: string
  email: string
  password: string
  role: UserRole
  studentId?: string // Only for student users
  name: string
}

export interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isAuthenticated: boolean
  isAdmin: boolean
  isStudent: boolean
}
