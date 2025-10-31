"use client"

import { useAuth } from "@/contexts/auth-context"
import { useStudents } from "@/hooks/use-students"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Calendar, DollarSign, TrendingUp } from "lucide-react"
import { format, subMonths } from "date-fns"
import { ptBR } from "date-fns/locale"

export default function StudentPaymentsPage() {
  const { user } = useAuth()
  const { students } = useStudents()

  const student = students.find((s) => s.id === user?.studentId)

  if (!student) {
    return (
      <div className="p-8">
        <div className="text-center text-muted-foreground">Dados do aluno não encontrados</div>
      </div>
    )
  }

  // Generate payment history for the last 12 months
  const generatePaymentHistory = () => {
    const history = []
    const today = new Date()

    for (let i = 0; i < 12; i++) {
      const monthDate = subMonths(today, i)
      const isPaid = student.lastPaymentDate
        ? new Date(student.lastPaymentDate) >= monthDate
        : i > student.overdueMonths

      history.push({
        month: format(monthDate, "MMMM yyyy", { locale: ptBR }),
        date: monthDate,
        amount: student.monthlyFee,
        status: isPaid ? "Pago" : i === 0 ? "Pendente" : "Atrasado",
        paidDate: isPaid ? format(monthDate, "dd/MM/yyyy") : null,
      })
    }

    return history.reverse()
  }

  const paymentHistory = generatePaymentHistory()
  const totalPaid = paymentHistory.filter((p) => p.status === "Pago").length * student.monthlyFee
  const totalOverdue = student.overdueMonths * student.monthlyFee

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pago":
        return "bg-success text-success-foreground"
      case "Pendente":
        return "bg-warning text-warning-foreground"
      case "Atrasado":
        return "bg-destructive text-destructive-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Meus Pagamentos</h1>
        <p className="text-muted-foreground">Acompanhe seu histórico de pagamentos e mensalidades</p>
      </div>

      {/* Payment Summary Cards */}
      <div className="mb-8 grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mensalidade</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {student.monthlyFee.toFixed(2).replace(".", ",")}</div>
            <p className="text-xs text-muted-foreground">Valor mensal</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pago</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">R$ {totalPaid.toFixed(2).replace(".", ",")}</div>
            <p className="text-xs text-muted-foreground">Últimos 12 meses</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Em Atraso</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">R$ {totalOverdue.toFixed(2).replace(".", ",")}</div>
            <p className="text-xs text-muted-foreground">
              {student.overdueMonths} {student.overdueMonths === 1 ? "mês" : "meses"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Payment History */}
      <Card>
        <CardHeader>
          <CardTitle>Histórico de Pagamentos</CardTitle>
          <CardDescription>Últimos 12 meses de mensalidades</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {paymentHistory.map((payment, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg border border-border p-4 transition-colors hover:bg-accent"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium capitalize text-foreground">{payment.month}</p>
                    {payment.paidDate && <p className="text-sm text-muted-foreground">Pago em {payment.paidDate}</p>}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <p className="font-semibold text-foreground">R$ {payment.amount.toFixed(2).replace(".", ",")}</p>
                  <Badge className={getStatusColor(payment.status)}>{payment.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
