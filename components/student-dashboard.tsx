"use client"

import { useAuth } from "@/contexts/auth-context"
import { useStudents } from "@/hooks/use-students"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Music, Calendar, DollarSign, TrendingUp, AlertCircle, CheckCircle, Clock, User } from "lucide-react"
import { format, addMonths } from "date-fns"
import { ptBR } from "date-fns/locale"

export function StudentDashboard() {
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

  const nextPaymentDate = addMonths(new Date(), 1)
  const totalOverdue = student.overdueMonths * student.monthlyFee

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Pago":
        return <CheckCircle className="h-5 w-5 text-success" />
      case "Pendente":
        return <Clock className="h-5 w-5 text-warning" />
      case "Atrasado":
        return <AlertCircle className="h-5 w-5 text-destructive" />
      default:
        return null
    }
  }

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
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Olá, {student.name.split(" ")[0]}!</h1>
        <p className="text-muted-foreground">Bem-vindo ao seu painel de aluno</p>
      </div>

      {/* Alert for overdue payments */}
      {student.paymentStatus === "Atrasado" && (
        <Card className="border-destructive bg-destructive/5">
          <CardContent className="flex items-start gap-4 pt-6">
            <AlertCircle className="h-6 w-6 text-destructive" />
            <div className="flex-1">
              <h3 className="font-semibold text-destructive">Pagamento em Atraso</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Você possui {student.overdueMonths} {student.overdueMonths === 1 ? "mês" : "meses"} em atraso. Total
                devido: R$ {totalOverdue.toFixed(2).replace(".", ",")}
              </p>
              <Button asChild className="mt-3" size="sm">
                <Link href="/meus-pagamentos">Ver Detalhes</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Stats */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Status de Pagamento</CardTitle>
            {getStatusIcon(student.paymentStatus)}
          </CardHeader>
          <CardContent>
            <Badge className={getStatusColor(student.paymentStatus)}>{student.paymentStatus}</Badge>
            <p className="mt-2 text-xs text-muted-foreground">Status atual da mensalidade</p>
          </CardContent>
        </Card>

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
            <CardTitle className="text-sm font-medium">Próximo Pagamento</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{format(nextPaymentDate, "dd/MM/yyyy")}</div>
            <p className="text-xs text-muted-foreground capitalize">
              {format(nextPaymentDate, "MMMM yyyy", { locale: ptBR })}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tempo de Matrícula</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.floor(
                (new Date().getTime() - new Date(student.enrollmentDate).getTime()) / (1000 * 60 * 60 * 24 * 30),
              )}
            </div>
            <p className="text-xs text-muted-foreground">Meses na escola</p>
          </CardContent>
        </Card>
      </div>

      {/* Course Information */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Music className="h-5 w-5" />
              Informações do Curso
            </CardTitle>
            <CardDescription>Detalhes sobre suas aulas</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Instrumento</span>
              <span className="font-medium text-foreground">{student.instrument}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Nível</span>
              <Badge variant="secondary">{student.experienceLevel}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Tipo de Aula</span>
              <span className="font-medium text-foreground">{student.packageType}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Aulas em Grupo</span>
              <span className="font-medium text-foreground">{student.availableForGroup ? "Sim" : "Não"}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Meus Objetivos
            </CardTitle>
            <CardDescription>O que você quer alcançar</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-foreground">{student.objectives}</p>
            <div className="mt-4 flex gap-2">
              <Button asChild variant="outline" size="sm" className="flex-1 bg-transparent">
                <Link href="/meu-perfil">Ver Perfil Completo</Link>
              </Button>
              <Button asChild variant="outline" size="sm" className="flex-1 bg-transparent">
                <Link href="/meus-pagamentos">Ver Pagamentos</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Ações Rápidas</CardTitle>
          <CardDescription>Acesse rapidamente as principais funcionalidades</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          <Button asChild variant="outline" className="h-auto flex-col gap-2 py-4 bg-transparent">
            <Link href="/meu-perfil">
              <User className="h-6 w-6" />
              <span>Meus Dados</span>
            </Link>
          </Button>
          <Button asChild variant="outline" className="h-auto flex-col gap-2 py-4 bg-transparent">
            <Link href="/meus-pagamentos">
              <DollarSign className="h-6 w-6" />
              <span>Histórico de Pagamentos</span>
            </Link>
          </Button>
          <Button asChild variant="outline" className="h-auto flex-col gap-2 py-4 bg-transparent" disabled>
            <div>
              <Calendar className="h-6 w-6" />
              <span>Agendar Aula</span>
              <span className="text-xs text-muted-foreground">(Em breve)</span>
            </div>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
