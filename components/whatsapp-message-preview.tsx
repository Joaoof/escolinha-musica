"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare } from "lucide-react"

interface WhatsAppMessagePreviewProps {
  message: string
  studentName: string
}

export function WhatsAppMessagePreview({ message, studentName }: WhatsAppMessagePreviewProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <MessageSquare className="h-5 w-5 text-green-600" />
          Prévia da Mensagem
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border border-border bg-muted p-4">
          <div className="mb-2 text-xs text-muted-foreground">Para: {studentName}</div>
          <div className="whitespace-pre-wrap rounded-lg bg-green-100 p-3 text-sm text-foreground">{message}</div>
        </div>
      </CardContent>
    </Card>
  )
}
