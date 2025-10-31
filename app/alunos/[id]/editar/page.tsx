"use client"

import { use } from "react"
import { useStudent } from "@/hooks/use-students"
import { StudentForm } from "@/components/student-form"
import { studentStore } from "@/lib/student-store"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function EditarAlunoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const student = useStudent(id)
  const router = useRouter()

  const handleSubmit = (data: any) => {
    studentStore.updateStudent(id, data)
    router.push(`/alunos/${id}`)
  }

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

  return (
    <div className="space-y-6 p-8">
      <div className="flex items-center gap-4">
        <Link href={`/alunos/${id}`}>
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Editar Aluno</h1>
          <p className="text-muted-foreground">{student.name}</p>
        </div>
      </div>

      <StudentForm student={student} onSubmit={handleSubmit} onCancel={() => router.push(`/alunos/${id}`)} />
    </div>
  )
}
