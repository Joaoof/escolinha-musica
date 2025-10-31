import type { CreatePaymentDto, PaymentResponseDto, PaymentSummaryDto } from "@/dtos/payment.dto"

export interface IPaymentService {
  getAll(): Promise<PaymentResponseDto[]>
  getByStudentId(studentId: string): Promise<PaymentResponseDto[]>
  create(dto: CreatePaymentDto): Promise<PaymentResponseDto>
  recordPayment(studentId: string, month: string): Promise<void>
  getSummary(): Promise<PaymentSummaryDto>
  getOverduePayments(): Promise<PaymentResponseDto[]>
}
