"use client"

import { PaymentTable } from "@/components/payment-table"
import { useStudents } from "@/hooks/use-students"
import { Card, CardContent } from "@/components/ui/card"
import { DollarSign, AlertCircle, Clock, TrendingUp } from "lucide-react"
import { useMemo } from "react"
import { ProtectedRoute } from "@/components/protected-route"

export default function PagamentosPage() {
  const students = useStudents()

  const stats = useMemo(() => {
    const paid = students.filter((s) => s.paymentStatus === "Pago").length
    const pending = students.filter((s) => s.paymentStatus === "Pendente").length
    const overdue = students.filter((s) => s.paymentStatus === "Atrasado").length

    const totalOverdue = students
      .filter((s) => s.paymentStatus === "Atrasado")
      .reduce((sum, s) => sum + s.monthlyFee * s.overdueMonths, 0)

    const monthlyRevenue = students.filter((s) => s.paymentStatus === "Pago").reduce((sum, s) => sum + s.monthlyFee, 0)

    const expectedRevenue = students.reduce((sum, s) => sum + s.monthlyFee, 0)

    return {
      paid,
      pending,
      overdue,
      totalOverdue,
      monthlyRevenue,
      expectedRevenue,
    }
  }, [students])

  return (
    <ProtectedRoute adminOnly>
      <div className="space-y-6 p-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Controle de Pagamentos</h1>
          <p className="text-muted-foreground">Gerencie os pagamentos de todos os alunos</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-green-900">Pagamentos em Dia</p>
                  <p className="text-2xl font-bold text-green-900">{stats.paid}</p>
                  <p className="text-xs text-green-700">R$ {stats.monthlyRevenue.toLocaleString("pt-BR")}</p>
                </div>
                <div className="rounded-full bg-green-200 p-3">
                  <DollarSign className="h-6 w-6 text-green-900" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-orange-200 bg-orange-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-orange-900">Pagamentos Pendentes</p>
                  <p className="text-2xl font-bold text-orange-900">{stats.pending}</p>
                  <p className="text-xs text-orange-700">Aguardando pagamento</p>
                </div>
                <div className="rounded-full bg-orange-200 p-3">
                  <Clock className="h-6 w-6 text-orange-900" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-red-900">Pagamentos Atrasados</p>
                  <p className="text-2xl font-bold text-red-900">{stats.overdue}</p>
                  <p className="text-xs text-red-700">Requer atenção</p>
                </div>
                <div className="rounded-full bg-red-200 p-3">
                  <AlertCircle className="h-6 w-6 text-red-900" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-blue-900">Total em Atraso</p>
                  <p className="text-2xl font-bold text-blue-900">R$ {stats.totalOverdue.toLocaleString("pt-BR")}</p>
                  <p className="text-xs text-blue-700">A receber</p>
                </div>
                <div className="rounded-full bg-blue-200 p-3">
                  <TrendingUp className="h-6 w-6 text-blue-900" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <PaymentTable students={students} />
      </div>
    </ProtectedRoute>
  )
}
