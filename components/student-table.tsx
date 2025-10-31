"use client"

import { useState, useMemo } from "react"
import type { Student } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import {
  Eye,
  Pencil,
  Trash2,
  Search,
  Filter,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  LayoutGrid,
  LayoutList,
  TrendingUp,
  Users,
  DollarSign,
  AlertCircle,
} from "lucide-react"
import Link from "next/link"

interface StudentTableProps {
  students: Student[]
  onDelete?: (id: string) => void
}

type SortField = "name" | "instrument" | "monthlyFee" | "paymentStatus"
type SortOrder = "asc" | "desc"
type ViewMode = "table" | "grid"

export function StudentTable({ students, onDelete }: StudentTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [instrumentFilter, setInstrumentFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [sortField, setSortField] = useState<SortField>("name")
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc")
  const [viewMode, setViewMode] = useState<ViewMode>("table")

  const filteredAndSortedStudents = useMemo(() => {
    const filtered = students.filter((student) => {
      const matchesSearch =
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.phone.includes(searchTerm) ||
        student.id.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesInstrument = instrumentFilter === "all" || student.instrument === instrumentFilter
      const matchesStatus = statusFilter === "all" || student.paymentStatus === statusFilter

      return matchesSearch && matchesInstrument && matchesStatus
    })

    // Ordenação
    filtered.sort((a, b) => {
      let comparison = 0

      switch (sortField) {
        case "name":
          comparison = a.name.localeCompare(b.name)
          break
        case "instrument":
          comparison = a.instrument.localeCompare(b.instrument)
          break
        case "monthlyFee":
          comparison = parseFloat(a.monthlyFee.toString()) - parseFloat(b.monthlyFee.toString())
          break
        case "paymentStatus":
          const statusOrder = { Pago: 1, Pendente: 2, Atrasado: 3 }
          comparison =
            statusOrder[a.paymentStatus as keyof typeof statusOrder] -
            statusOrder[b.paymentStatus as keyof typeof statusOrder]
          break
      }

      return sortOrder === "asc" ? comparison : -comparison
    })

    return filtered
  }, [students, searchTerm, instrumentFilter, statusFilter, sortField, sortOrder])

  const stats = useMemo(() => {
    const total = students.length
    const paid = students.filter((s) => s.paymentStatus === "Pago").length
    const pending = students.filter((s) => s.paymentStatus === "Pendente").length
    const overdue = students.filter((s) => s.paymentStatus === "Atrasado").length
    const totalRevenue = students.reduce((sum, s) => sum + s.monthlyFee, 0)

    return { total, paid, pending, overdue, totalRevenue }
  }, [students])

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortOrder("asc")
    }
  }

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return <ArrowUpDown className="h-3.5 w-3.5 ml-1 opacity-50" />
    return sortOrder === "asc" ? (
      <ArrowUp className="h-3.5 w-3.5 ml-1 text-primary" />
    ) : (
      <ArrowDown className="h-3.5 w-3.5 ml-1 text-primary" />
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pago":
        return "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
      case "Pendente":
        return "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100"
      case "Atrasado":
        return "bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100"
      default:
        return "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Pago":
        return "✓"
      case "Pendente":
        return "⏱"
      case "Atrasado":
        return "⚠"
      default:
        return "○"
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const getAvatarColor = (name: string) => {
    const colors = [
      "bg-blue-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-indigo-500",
      "bg-cyan-500",
      "bg-teal-500",
      "bg-green-500",
      "bg-orange-500",
    ]
    const index = name.charCodeAt(0) % colors.length
    return colors[index]
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-blue-500 hover:shadow-lg transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total de Alunos</p>
                <p className="text-2xl font-bold text-foreground">{stats.total}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-emerald-500 hover:shadow-lg transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pagamentos em Dia</p>
                <p className="text-2xl font-bold text-emerald-600">{stats.paid}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-amber-500 hover:shadow-lg transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pendentes</p>
                <p className="text-2xl font-bold text-amber-600">{stats.pending}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-rose-500 hover:shadow-lg transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Receita Mensal</p>
                <p className="text-2xl font-bold text-foreground">R$ {stats.totalRevenue.toFixed(2)}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative flex-1 md:max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome, email, telefone ou ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 w-full rounded-lg shadow-sm border-2 focus:border-primary transition-colors"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-2 p-1 bg-muted rounded-lg">
            <Button
              variant={viewMode === "table" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("table")}
              className="h-8"
            >
              <LayoutList className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="h-8"
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground hidden md:block" />

            <Select value={instrumentFilter} onValueChange={setInstrumentFilter}>
              <SelectTrigger className="w-40 md:w-[180px]">
                <SelectValue placeholder="Instrumento" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos Instrumentos</SelectItem>
                <SelectItem value="Guitarra">Guitarra</SelectItem>
                <SelectItem value="Teclado">Teclado</SelectItem>
                <SelectItem value="Bateria">Bateria</SelectItem>
                <SelectItem value="Violão">Violão</SelectItem>
                <SelectItem value="Contra-baixo">Contra-baixo</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[120px] md:w-[140px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos Status</SelectItem>
                <SelectItem value="Pago">Pago</SelectItem>
                <SelectItem value="Pendente">Pendente</SelectItem>
                <SelectItem value="Atrasado">Atrasado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {viewMode === "table" ? (
        <div className="rounded-xl border border-border overflow-hidden shadow-lg bg-card">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="w-20">ID</TableHead>
                <TableHead>
                  <button
                    onClick={() => handleSort("name")}
                    className="flex items-center hover:text-primary transition-colors font-semibold"
                  >
                    Nome
                    {getSortIcon("name")}
                  </button>
                </TableHead>
                <TableHead>
                  <button
                    onClick={() => handleSort("instrument")}
                    className="flex items-center hover:text-primary transition-colors font-semibold"
                  >
                    Instrumento
                    {getSortIcon("instrument")}
                  </button>
                </TableHead>
                <TableHead className="hidden sm:table-cell">Pacote</TableHead>
                <TableHead className="text-right hidden md:table-cell">
                  <button
                    onClick={() => handleSort("monthlyFee")}
                    className="flex items-center ml-auto hover:text-primary transition-colors font-semibold"
                  >
                    Mensalidade
                    {getSortIcon("monthlyFee")}
                  </button>
                </TableHead>
                <TableHead>
                  <button
                    onClick={() => handleSort("paymentStatus")}
                    className="flex items-center hover:text-primary transition-colors font-semibold"
                  >
                    Status
                    {getSortIcon("paymentStatus")}
                  </button>
                </TableHead>
                <TableHead className="text-center w-[140px]">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAndSortedStudents.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-32">
                    <div className="flex flex-col items-center justify-center text-center">
                      <Search className="h-12 w-12 text-muted-foreground/50 mb-2" />
                      <p className="text-muted-foreground font-medium">Nenhum aluno encontrado</p>
                      <p className="text-sm text-muted-foreground/70">Tente ajustar os filtros de busca</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredAndSortedStudents.map((student, index) => (
                  <TableRow
                    key={student.id}
                    className="hover:bg-muted/50 transition-all duration-200 animate-in fade-in"
                    style={{ animationDelay: `${index * 30}ms` }}
                  >
                    <TableCell className="font-mono text-xs text-muted-foreground">
                      #{student.id.substring(0, 6)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div
                          className={`h-10 w-10 rounded-full ${getAvatarColor(student.name)} flex items-center justify-center text-white font-semibold text-sm shadow-md`}
                        >
                          {getInitials(student.name)}
                        </div>
                        <div>
                          <div className="font-semibold text-foreground">{student.name}</div>
                          <div className="text-xs text-muted-foreground">{student.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="font-medium">
                        {student.instrument}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground hidden sm:table-cell">{student.packageType}</TableCell>
                    <TableCell className="text-right font-bold hidden md:table-cell text-lg">
                      R$ {student.monthlyFee}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`font-medium ${getStatusColor(student.paymentStatus)}`}>
                        <span className="mr-1">{getStatusIcon(student.paymentStatus)}</span>
                        {student.paymentStatus}
                        {student.overdueMonths > 0 && (
                          <span className="ml-1 text-xs font-bold">({student.overdueMonths}m)</span>
                        )}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-center gap-1">
                        <Link href={`/alunos/${student.id}`} passHref legacyBehavior>
                          <Button
                            variant="ghost"
                            size="icon"
                            title="Ver Detalhes"
                            className="hover:bg-blue-100 hover:text-blue-700 transition-colors"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>

                        <Link href={`/alunos/${student.id}/editar`} passHref legacyBehavior>
                          <Button
                            variant="ghost"
                            size="icon"
                            title="Editar Aluno"
                            className="hover:bg-amber-100 hover:text-amber-700 transition-colors"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </Link>

                        {onDelete && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onDelete(student.id)}
                            title="Excluir Aluno"
                            className="hover:bg-rose-100 hover:text-rose-700 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
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
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAndSortedStudents.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center py-16">
              <Search className="h-16 w-16 text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground font-medium text-lg">Nenhum aluno encontrado</p>
              <p className="text-sm text-muted-foreground/70">Tente ajustar os filtros de busca</p>
            </div>
          ) : (
            filteredAndSortedStudents.map((student, index) => (
              <Card
                key={student.id}
                className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-in fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`h-14 w-14 rounded-full ${getAvatarColor(student.name)} flex items-center justify-center text-white font-bold text-lg shadow-lg`}
                    >
                      {getInitials(student.name)}
                    </div>
                    <Badge variant="outline" className={`${getStatusColor(student.paymentStatus)}`}>
                      <span className="mr-1">{getStatusIcon(student.paymentStatus)}</span>
                      {student.paymentStatus}
                    </Badge>
                  </div>

                  <h3 className="font-bold text-lg mb-1 text-foreground">{student.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{student.email}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Instrumento:</span>
                      <Badge variant="secondary">{student.instrument}</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Pacote:</span>
                      <span className="font-medium">{student.packageType}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Mensalidade:</span>
                      <span className="font-bold text-lg">R$ {student.monthlyFee}</span>
                    </div>
                    {student.overdueMonths > 0 && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Meses atrasados:</span>
                        <span className="font-bold text-rose-600">{student.overdueMonths}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2 pt-4 border-t">
                    <Link href={`/alunos/${student.id}`} className="flex-1">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 bg-transparent"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Ver
                      </Button>
                    </Link>
                    <Link href={`/alunos/${student.id}/editar`} className="flex-1">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full hover:bg-amber-50 hover:text-amber-700 hover:border-amber-300 bg-transparent"
                      >
                        <Pencil className="h-4 w-4 mr-1" />
                        Editar
                      </Button>
                    </Link>
                    {onDelete && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onDelete(student.id)}
                        className="hover:bg-rose-50 hover:text-rose-700 hover:border-rose-300"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground pt-2 border-t">
        <div className="flex items-center gap-4">
          <span className="font-medium">
            Mostrando <span className="text-foreground font-bold">{filteredAndSortedStudents.length}</span> de{" "}
            <span className="text-foreground font-bold">{students.length}</span> alunos
          </span>
          {(searchTerm || instrumentFilter !== "all" || statusFilter !== "all") && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSearchTerm("")
                setInstrumentFilter("all")
                setStatusFilter("all")
              }}
              className="text-xs"
            >
              Limpar filtros
            </Button>
          )}
        </div>
        <div className="text-xs text-muted-foreground/70">Última atualização: {new Date().toLocaleString("pt-BR")}</div>
      </div>
    </div>
  )
}
