import type { SendWhatsAppMessageDto, WhatsAppMessageResponseDto } from "@/dtos/whatsapp.dto"

export interface IWhatsAppService {
  sendMessage(dto: SendWhatsAppMessageDto): Promise<WhatsAppMessageResponseDto>
  sendBulkMessages(dto: SendWhatsAppMessageDto): Promise<WhatsAppMessageResponseDto>
  getMessageTemplates(): Promise<Array<{ id: string; name: string; content: string }>>
}
