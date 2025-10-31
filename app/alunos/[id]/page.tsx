"use client"

import { use } from "react"
import { useStudent, usePayments } from "@/hooks/use-students"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Mail, Phone, Calendar, Music, Target, Users } from "lucide-react"
import Link from "next/link"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function StudentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const student = useStudent(id)
  const payments = usePayments(id)

  if (!student) {
    return (
      <div className="flex h-full items-center justify-center p-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground">Aluno não encontrado</h2>
          <p className="text-muted-foreground">O aluno que você procura não existe.</p>
          <Link href="/alunos">
            <Button className="mt-4">Voltar para Alunos</Button>
          </Link>
        </div>
      </div>
    )
  }

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
    <div className="space-y-6 p-8">
      <div className="flex items-center gap-4">
        <Link href="/alunos">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-foreground">{student.name}</h1>
          <p className="text-muted-foreground">ID: {student.id}</p>
        </div>
        <Link href={`/alunos/${student.id}/editar`}>
          <Button>Editar Aluno</Button>
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Informações Pessoais</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium text-foreground">{student.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Telefone</p>
                  <p className="font-medium text-foreground">{student.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Idade</p>
                  <p className="font-medium text-foreground">{student.age} anos</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Data de Matrícula</p>
                  <p className="font-medium text-foreground">
                    {new Date(student.enrollmentDate).toLocaleDateString("pt-BR")}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Status de Pagamento</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Status Atual</p>
              <Badge className={`mt-1 ${getStatusColor(student.paymentStatus)}`}>{student.paymentStatus}</Badge>
            </div>
            {student.overdueMonths > 0 && (
              <div>
                <p className="text-sm text-muted-foreground">Meses em Atraso</p>
                <p className="text-2xl font-bold text-red-600">{student.overdueMonths}</p>
              </div>
            )}
            <div>
              <p className="text-sm text-muted-foreground">Último Pagamento</p>
              <p className="font-medium text-foreground">
                {student.lastPaymentDate
                  ? new Date(student.lastPaymentDate).toLocaleDateString("pt-BR")
                  : "Nenhum pagamento registrado"}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Informações do Curso</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Music className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Instrumento</p>
                <p className="font-medium text-foreground">{student.instrument}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Target className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Nível de Experiência</p>
                <p className="font-medium text-foreground">{student.experienceLevel}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Tipo de Pacote</p>
                <p className="font-medium text-foreground">
                  {student.packageType} - R$ {student.monthlyFee}/mês
                </p>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Disponível para Aula em Grupo</p>
              <p className="font-medium text-foreground">{student.availableForGroup ? "Sim" : "Não"}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Objetivos</p>
              <p className="font-medium text-foreground">{student.objectives}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Histórico de Pagamentos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border border-border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Mês</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Valor</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments
                    .slice(-6)
                    .reverse()
                    .map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell className="font-medium">
                          {new Date(payment.month + "-01").toLocaleDateString("pt-BR", {
                            month: "short",
                            year: "numeric",
                          })}
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(payment.status)}>{payment.status}</Badge>
                        </TableCell>
                        <TableCell className="text-right">R$ {payment.amount}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
