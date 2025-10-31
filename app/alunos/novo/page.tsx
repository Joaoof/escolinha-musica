"use client"

import { StudentForm } from "@/components/student-form"
import { studentStore } from "@/lib/student-store"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { ProtectedRoute } from "@/components/protected-route"

export default function NovoAlunoPage() {
  const router = useRouter()

  const handleSubmit = (data: any) => {
    studentStore.addStudent(data)
    router.push("/alunos")
  }

  return (
    <ProtectedRoute adminOnly>
      <div className="space-y-6 p-8">
        <div className="flex items-center gap-4">
          <Link href="/alunos">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Novo Aluno</h1>
            <p className="text-muted-foreground">Cadastre um novo aluno na escola</p>
          </div>
        </div>

        <StudentForm onSubmit={handleSubmit} onCancel={() => router.push("/alunos")} />
      </div>
    </ProtectedRoute>
  )
}
