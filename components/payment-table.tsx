"use client"

import { useState, useMemo } from "react"
import type { Student } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, CheckCircle, Eye } from "lucide-react"
import Link from "next/link"
import { studentStore } from "@/lib/student-store"

interface PaymentTableProps {
  students: Student[]
}

export function PaymentTable({ students }: PaymentTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("overdue")

  const filteredAndSortedStudents = useMemo(() => {
    const filtered = students.filter((student) => {
      const matchesSearch =
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.id.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus = statusFilter === "all" || student.paymentStatus === statusFilter

      return matchesSearch && matchesStatus
    })

    // Sort students
    filtered.sort((a, b) => {
      if (sortBy === "overdue") {
        return b.overdueMonths - a.overdueMonths
      } else if (sortBy === "name") {
        return a.name.localeCompare(b.name)
      } else if (sortBy === "amount") {
        return b.monthlyFee - a.monthlyFee
      }
      return 0
    })

    return filtered
  }, [students, searchTerm, statusFilter, sortBy])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pago":
        return "bg-green-100 text-green-800 border-green-200"
      case "Pendente":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "Atrasado":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const handleRecordPayment = (studentId: string) => {
    const currentMonth = new Date().toISOString().substring(0, 7)
    studentStore.recordPayment(studentId, currentMonth)
  }

  const totalOverdue = filteredAndSortedStudents
    .filter((s) => s.paymentStatus === "Atrasado")
    .reduce((sum, s) => sum + s.monthlyFee * s.overdueMonths, 0)

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative flex-1 md:max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome, email ou ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos status</SelectItem>
              <SelectItem value="Pago">Pago</SelectItem>
              <SelectItem value="Pendente">Pendente</SelectItem>
              <SelectItem value="Atrasado">Atrasado</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="overdue">Mais atrasados</SelectItem>
              <SelectItem value="name">Nome</SelectItem>
              <SelectItem value="amount">Valor</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {statusFilter === "Atrasado" && totalOverdue > 0 && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4">
          <p className="text-sm font-medium text-red-900">
            Total em atraso: <span className="text-lg font-bold">R$ {totalOverdue.toLocaleString("pt-BR")}</span>
          </p>
        </div>
      )}

      <div className="rounded-lg border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>Mensalidade</TableHead>
              <TableHead>Último Pagamento</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Meses em Atraso</TableHead>
              <TableHead>Total Devido</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedStudents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center text-muted-foreground">
                  Nenhum pagamento encontrado
                </TableCell>
              </TableRow>
            ) : (
              filteredAndSortedStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-mono text-sm">{student.id}</TableCell>
                  <TableCell>
                    <div className="font-medium text-foreground">{student.name}</div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{student.phone}</TableCell>
                  <TableCell>R$ {student.monthlyFee}</TableCell>
                  <TableCell className="text-sm">
                    {student.lastPaymentDate ? new Date(student.lastPaymentDate).toLocaleDateString("pt-BR") : "Nunca"}
                  </TableCell>
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
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Link href={`/alunos/${student.id}`}>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                      {student.paymentStatus !== "Pago" && (
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => handleRecordPayment(student.id)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="mr-1 h-4 w-4" />
                          Registrar
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="text-sm text-muted-foreground">
        Mostrando {filteredAndSortedStudents.length} de {students.length} alunos
      </div>
    </div>
  )
}
