export interface CreatePaymentDto {
  studentId: string
  month: string
  amount: number
}

export interface PaymentResponseDto {
  id: string
  studentId: string
  studentName: string
  month: string
  dueDate: string
  paidDate: string | null
  amount: number
  status: string
}

export interface PaymentSummaryDto {
  totalPaid: number
  totalPending: number
  totalOverdue: number
  overdueCount: number
}
