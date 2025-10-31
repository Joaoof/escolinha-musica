"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useStudents } from "@/hooks/use-students"
import { useMemo } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function RecentStudents() {
  const students = useStudents()

  const recentStudents = useMemo(() => {
    return [...students]
      .sort((a, b) => new Date(b.enrollmentDate).getTime() - new Date(a.enrollmentDate).getTime())
      .slice(0, 5)
  }, [students])

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
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Alunos Recentes</CardTitle>
        <Link href="/alunos" className="flex items-center gap-1 text-sm text-primary hover:underline">
          Ver todos
          <ArrowRight className="h-4 w-4" />
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentStudents.map((student) => (
            <div
              key={student.id}
              className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0"
            >
              <div className="space-y-1">
                <p className="font-medium text-foreground">{student.name}</p>
                <p className="text-sm text-muted-foreground">
                  {student.instrument} • {student.packageType}
                </p>
              </div>
              <Badge className={getStatusColor(student.paymentStatus)}>{student.paymentStatus}</Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
