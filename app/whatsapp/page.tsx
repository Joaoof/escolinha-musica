"use client"

import { useState, useMemo } from "react"
import { useStudents } from "@/hooks/use-students"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { WhatsAppStudentList } from "@/components/whatsapp-student-list"
import { WhatsAppMessagePreview } from "@/components/whatsapp-message-preview"
import { MessageTemplates } from "@/components/message-templates"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, AlertCircle, Info } from "lucide-react"
import { ProtectedRoute } from "@/components/protected-route"

export default function WhatsAppPage() {
  const students = useStudents()
  const [filter, setFilter] = useState<string>("all")
  const [selectedStudents, setSelectedStudents] = useState<string[]>([])
  const [message, setMessage] = useState("")
  const [sentMessages, setSentMessages] = useState<string[]>([])
  const [showSuccess, setShowSuccess] = useState(false)

  const filteredStudents = useMemo(() => {
    if (filter === "all") {
      return students.filter((s) => s.paymentStatus === "Pendente" || s.paymentStatus === "Atrasado")
    } else if (filter === "pending") {
      return students.filter((s) => s.paymentStatus === "Pendente")
    } else if (filter === "overdue") {
      return students.filter((s) => s.paymentStatus === "Atrasado")
    }
    return []
  }, [students, filter])

  const handleSendMessage = (studentIds: string[]) => {
    // Simulate sending WhatsApp messages
    setSentMessages([...sentMessages, ...studentIds])
    setShowSuccess(true)
    setSelectedStudents([])

    setTimeout(() => {
      setShowSuccess(false)
    }, 5000)
  }

  const formatMessage = (template: string, student: any) => {
    return template
      .replace("{nome}", student.name)
      .replace("{valor}", `${student.monthlyFee}`)
      .replace("{meses}", `${student.overdueMonths}`)
      .replace("{total}", `${student.monthlyFee * (student.overdueMonths || 1)}`)
      .replace("{instrumento}", student.instrument)
      .replace("{telefone}", "(11) 99999-9999")
  }

  const previewStudent = selectedStudents.length > 0 ? students.find((s) => s.id === selectedStudents[0]) : null

  return (
    <ProtectedRoute adminOnly>
      <div className="space-y-6 p-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Mensagens WhatsApp</h1>
          <p className="text-muted-foreground">Envie lembretes automáticos para alunos com pagamentos pendentes</p>
        </div>

        <Alert className="border-blue-200 bg-blue-50">
          <Info className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-900">
            As mensagens serão enviadas automaticamente via WhatsApp para os alunos selecionados. Use as variáveis{" "}
            <code className="rounded bg-blue-100 px-1 py-0.5">{"{nome}"}</code>,{" "}
            <code className="rounded bg-blue-100 px-1 py-0.5">{"{valor}"}</code>,{" "}
            <code className="rounded bg-blue-100 px-1 py-0.5">{"{meses}"}</code>,{" "}
            <code className="rounded bg-blue-100 px-1 py-0.5">{"{total}"}</code> e{" "}
            <code className="rounded bg-blue-100 px-1 py-0.5">{"{instrumento}"}</code> para personalizar.
          </AlertDescription>
        </Alert>

        {showSuccess && (
          <Alert className="border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-900">
              Mensagens enviadas com sucesso para {sentMessages.length} aluno(s)!
            </AlertDescription>
          </Alert>
        )}

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Alunos</CardTitle>
                  <Select value={filter} onValueChange={setFilter}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos (Pendente + Atrasado)</SelectItem>
                      <SelectItem value="pending">Apenas Pendentes</SelectItem>
                      <SelectItem value="overdue">Apenas Atrasados</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <WhatsAppStudentList
                  students={filteredStudents}
                  selectedStudents={selectedStudents}
                  onSelectionChange={setSelectedStudents}
                  onSendMessage={handleSendMessage}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Mensagem</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="message">Texto da Mensagem</Label>
                  <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Digite sua mensagem aqui ou selecione um modelo ao lado..."
                    rows={10}
                    className="font-mono text-sm"
                  />
                </div>
                <div className="text-xs text-muted-foreground">
                  Variáveis disponíveis: {"{nome}"}, {"{valor}"}, {"{meses}"}, {"{total}"}, {"{instrumento}"}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <MessageTemplates onSelectTemplate={setMessage} />

            {previewStudent && message && (
              <WhatsAppMessagePreview
                message={formatMessage(message, previewStudent)}
                studentName={previewStudent.name}
              />
            )}

            <Card className="border-orange-200 bg-orange-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base text-orange-900">
                  <AlertCircle className="h-5 w-5" />
                  Estatísticas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-orange-900">Total Pendentes:</span>
                  <span className="font-semibold text-orange-900">
                    {students.filter((s) => s.paymentStatus === "Pendente").length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-orange-900">Total Atrasados:</span>
                  <span className="font-semibold text-orange-900">
                    {students.filter((s) => s.paymentStatus === "Atrasado").length}
                  </span>
                </div>
                <div className="flex justify-between border-t border-orange-200 pt-2">
                  <span className="text-orange-900">Mensagens Enviadas Hoje:</span>
                  <span className="font-semibold text-orange-900">{sentMessages.length}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
