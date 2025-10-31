"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useStudents } from "@/hooks/use-students"
import { useMemo } from "react"

export function PaymentOverview() {
  const students = useStudents()

  const paymentData = useMemo(() => {
    const byInstrument = students.reduce(
      (acc, student) => {
        if (!acc[student.instrument]) {
          acc[student.instrument] = { total: 0, paid: 0, pending: 0, overdue: 0 }
        }
        acc[student.instrument].total++
        if (student.paymentStatus === "Pago") acc[student.instrument].paid++
        if (student.paymentStatus === "Pendente") acc[student.instrument].pending++
        if (student.paymentStatus === "Atrasado") acc[student.instrument].overdue++
        return acc
      },
      {} as Record<string, { total: number; paid: number; pending: number; overdue: number }>,
    )

    return Object.entries(byInstrument).map(([instrument, data]) => ({
      instrument,
      ...data,
      paidPercentage: Math.round((data.paid / data.total) * 100),
    }))
  }, [students])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Visão por Instrumento</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {paymentData.map((data) => (
            <div key={data.instrument} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-foreground">{data.instrument}</span>
                <span className="text-muted-foreground">{data.total} alunos</span>
              </div>
              <div className="flex h-2 overflow-hidden rounded-full bg-muted">
                <div className="bg-green-500" style={{ width: `${(data.paid / data.total) * 100}%` }} />
                <div className="bg-orange-500" style={{ width: `${(data.pending / data.total) * 100}%` }} />
                <div className="bg-red-500" style={{ width: `${(data.overdue / data.total) * 100}%` }} />
              </div>
              <div className="flex gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  {data.paid} pagos
                </span>
                <span className="flex items-center gap-1">
                  <div className="h-2 w-2 rounded-full bg-orange-500" />
                  {data.pending} pendentes
                </span>
                <span className="flex items-center gap-1">
                  <div className="h-2 w-2 rounded-full bg-red-500" />
                  {data.overdue} atrasados
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
