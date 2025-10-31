"use client"

import { Button } from "@/components/ui/button"
import { StudentTable } from "@/components/student-table"
import { useStudents } from "@/hooks/use-students"
import { studentStore } from "@/lib/student-store"
import { Plus } from "lucide-react"
import Link from "next/link"
import { ProtectedRoute } from "@/components/protected-route"

export default function AlunosPage() {
  const students = useStudents()

  const handleDelete = (id: string) => {
    if (confirm("Tem certeza que deseja excluir este aluno?")) {
      studentStore.deleteStudent(id)
    }
  }

  return (
    <ProtectedRoute adminOnly>
      <div className="space-y-6 p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Alunos</h1>
            <p className="text-muted-foreground">Gerencie todos os alunos da escola</p>
          </div>
          <Link href="/alunos/novo">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Novo Aluno
            </Button>
          </Link>
        </div>

        <StudentTable students={students} onDelete={handleDelete} />
      </div>
    </ProtectedRoute>
  )
}
