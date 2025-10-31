"use client"
import type { Student } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MessageSquare } from "lucide-react"

interface WhatsAppStudentListProps {
  students: Student[]
  selectedStudents: string[]
  onSelectionChange: (studentIds: string[]) => void
  onSendMessage: (studentIds: string[]) => void
}

export function WhatsAppStudentList({
  students,
  selectedStudents,
  onSelectionChange,
  onSendMessage,
}: WhatsAppStudentListProps) {
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      onSelectionChange(students.map((s) => s.id))
    } else {
      onSelectionChange([])
    }
  }

  const handleSelectStudent = (studentId: string, checked: boolean) => {
    if (checked) {
      onSelectionChange([...selectedStudents, studentId])
    } else {
      onSelectionChange(selectedStudents.filter((id) => id !== studentId))
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pendente":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "Atrasado":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Checkbox
            id="select-all"
            checked={selectedStudents.length === students.length && students.length > 0}
            onCheckedChange={handleSelectAll}
          />
          <label htmlFor="select-all" className="text-sm font-medium text-foreground">
            Selecionar todos ({students.length})
          </label>
        </div>
        <Button
          onClick={() => onSendMessage(selectedStudents)}
          disabled={selectedStudents.length === 0}
          className="bg-green-600 hover:bg-green-700"
        >
          <MessageSquare className="mr-2 h-4 w-4" />
          Enviar para {selectedStudents.length} aluno{selectedStudents.length !== 1 ? "s" : ""}
        </Button>
      </div>

      <div className="rounded-lg border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12"></TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Meses em Atraso</TableHead>
              <TableHead>Total Devido</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground">
                  Nenhum aluno com pagamento pendente ou atrasado
                </TableCell>
              </TableRow>
            ) : (
              students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedStudents.includes(student.id)}
                      onCheckedChange={(checked) => handleSelectStudent(student.id, checked as boolean)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="font-medium text-foreground">{student.name}</div>
                  </TableCell>
                  <TableCell className="font-mono text-sm">{student.phone}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(student.paymentStatus)}>{student.paymentStatus}</Badge>
                  </TableCell>
                  <TableCell>
                    {student.overdueMonths > 0 ? (
                      <span className="font-semibold text-red-600">{student.overdueMonths}</span>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {student.overdueMonths > 0 ? (
                      <span className="font-semibold text-red-600">
                        R$ {(student.monthlyFee * student.overdueMonths).toLocaleString("pt-BR")}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">R$ {student.monthlyFee}</span>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
