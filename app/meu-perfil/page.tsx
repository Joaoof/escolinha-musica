"use client"

import { useAuth } from "@/contexts/auth-context"
import { useStudents } from "@/hooks/use-students"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User, Mail, Phone, Calendar, Music, Target, UsersIcon, DollarSign } from "lucide-react"

export default function StudentProfilePage() {
  const { user } = useAuth()
  const { students } = useStudents()

  // Find the student data for the logged-in user
  const student = students.find((s) => s.id === user?.studentId)

  if (!student) {
    return (
      <div className="p-8">
        <div className="text-center text-muted-foreground">Dados do aluno não encontrados</div>
      </div>
    )
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
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Meus Dados</h1>
        <p className="text-muted-foreground">Visualize suas informações pessoais e de matrícula</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Informações Pessoais
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Nome Completo</p>
              <p className="font-medium text-foreground">{student.name}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="flex items-center gap-2 font-medium text-foreground">
                <Mail className="h-4 w-4" />
                {student.email}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Telefone</p>
              <p className="flex items-center gap-2 font-medium text-foreground">
                <Phone className="h-4 w-4" />
                {student.phone}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Idade</p>
              <p className="font-medium text-foreground">{student.age} anos</p>
            </div>
          </CardContent>
        </Card>

        {/* Course Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Music className="h-5 w-5" />
              Informações do Curso
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Instrumento</p>
              <p className="font-medium text-foreground">{student.instrument}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Nível de Experiência</p>
              <Badge variant="secondary">{student.experienceLevel}</Badge>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Tipo de Aula</p>
              <p className="flex items-center gap-2 font-medium text-foreground">
                {student.packageType === "Grupo" ? <UsersIcon className="h-4 w-4" /> : <User className="h-4 w-4" />}
                {student.packageType}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Data de Matrícula</p>
              <p className="flex items-center gap-2 font-medium text-foreground">
                <Calendar className="h-4 w-4" />
                {new Date(student.enrollmentDate).toLocaleDateString("pt-BR")}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Objectives */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Meus Objetivos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground">{student.objectives}</p>
          </CardContent>
        </Card>

        {/* Payment Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Status de Pagamento
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Mensalidade</p>
              <p className="text-2xl font-bold text-foreground">R$ {student.monthlyFee.toFixed(2).replace(".", ",")}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Status Atual</p>
              <Badge className={getStatusColor(student.paymentStatus)}>{student.paymentStatus}</Badge>
            </div>
            {student.lastPaymentDate && (
              <div>
                <p className="text-sm text-muted-foreground">Último Pagamento</p>
                <p className="font-medium text-foreground">
                  {new Date(student.lastPaymentDate).toLocaleDateString("pt-BR")}
                </p>
              </div>
            )}
            {student.overdueMonths > 0 && (
              <div className="rounded-lg bg-destructive/10 p-3">
                <p className="text-sm font-medium text-destructive">
                  Você possui {student.overdueMonths} {student.overdueMonths === 1 ? "mês" : "meses"} em atraso
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Total devido: R$ {(student.monthlyFee * student.overdueMonths).toFixed(2).replace(".", ",")}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
