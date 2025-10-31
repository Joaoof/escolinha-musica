"use client"

import { useState, useMemo } from "react"
import type { Student } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, Pencil, Trash2, Search } from "lucide-react"
import Link from "next/link"

interface StudentTableProps {
  students: Student[]
  onDelete?: (id: string) => void
}

export function StudentTable({ students, onDelete }: StudentTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [instrumentFilter, setInstrumentFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchesSearch =
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.phone.includes(searchTerm) ||
        student.id.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesInstrument = instrumentFilter === "all" || student.instrument === instrumentFilter
      const matchesStatus = statusFilter === "all" || student.paymentStatus === statusFilter

      return matchesSearch && matchesInstrument && matchesStatus
    })
  }, [students, searchTerm, instrumentFilter, statusFilter])

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

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative flex-1 md:max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome, email, telefone ou ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2">
          <Select value={instrumentFilter} onValueChange={setInstrumentFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Instrumento" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos instrumentos</SelectItem>
              <SelectItem value="Guitarra">Guitarra</SelectItem>
              <SelectItem value="Teclado">Teclado</SelectItem>
              <SelectItem value="Bateria">Bateria</SelectItem>
              <SelectItem value="Violão">Violão</SelectItem>
              <SelectItem value="Contra-baixo">Contra-baixo</SelectItem>
            </SelectContent>
          </Select>
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
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Instrumento</TableHead>
              <TableHead>Pacote</TableHead>
              <TableHead>Mensalidade</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-muted-foreground">
                  Nenhum aluno encontrado
                </TableCell>
              </TableRow>
            ) : (
              filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-mono text-sm">{student.id}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium text-foreground">{student.name}</div>
                      <div className="text-sm text-muted-foreground">{student.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>{student.instrument}</TableCell>
                  <TableCell>{student.packageType}</TableCell>
                  <TableCell>R$ {student.monthlyFee}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(student.paymentStatus)}>
                      {student.paymentStatus}
                      {student.overdueMonths > 0 && ` (${student.overdueMonths}m)`}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Link href={`/alunos/${student.id}`}>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Link href={`/alunos/${student.id}/editar`}>
                        <Button variant="ghost" size="sm">
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </Link>
                      {onDelete && (
                        <Button variant="ghost" size="sm" onClick={() => onDelete(student.id)}>
                          <Trash2 className="h-4 w-4 text-red-600" />
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
        Mostrando {filteredStudents.length} de {students.length} alunos
      </div>
    </div>
  )
}
