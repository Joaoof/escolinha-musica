export interface SendWhatsAppMessageDto {
  studentIds: string[]
  message: string
  templateId?: string
}

export interface WhatsAppMessageResponseDto {
  success: boolean
  sentCount: number
  failedCount: number
  errors?: Array<{
    studentId: string
    error: string
  }>
}
