"use client"

import type React from "react"

import { useState } from "react"
import type { Student, Instrument, ExperienceLevel, PackageType } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface StudentFormProps {
  student?: Student
  onSubmit: (data: Partial<Student>) => void
  onCancel: () => void
}

export function StudentForm({ student, onSubmit, onCancel }: StudentFormProps) {
  const [formData, setFormData] = useState({
    name: student?.name || "",
    email: student?.email || "",
    phone: student?.phone || "",
    age: student?.age || 18,
    instrument: student?.instrument || ("Guitarra" as Instrument),
    experienceLevel: student?.experienceLevel || ("Iniciante" as ExperienceLevel),
    objectives: student?.objectives || "",
    availableForGroup: student?.availableForGroup ?? true,
    packageType: student?.packageType || ("Individual" as PackageType),
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const monthlyFee = formData.packageType === "Individual" ? 120 : 108

    onSubmit({
      ...formData,
      monthlyFee,
      enrollmentDate: student?.enrollmentDate || new Date().toISOString().split("T")[0],
      lastPaymentDate: student?.lastPaymentDate || null,
      paymentStatus: student?.paymentStatus || "Pendente",
      overdueMonths: student?.overdueMonths || 0,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Informações Pessoais</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Nome Completo *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Telefone *</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="(11) 99999-9999"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="age">Idade *</Label>
              <Input
                id="age"
                type="number"
                min="5"
                max="100"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: Number.parseInt(e.target.value) })}
                required
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Informações do Curso</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="instrument">Instrumento *</Label>
              <Select
                value={formData.instrument}
                onValueChange={(value) => setFormData({ ...formData, instrument: value as Instrument })}
              >
                <SelectTrigger id="instrument">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Guitarra">Guitarra</SelectItem>
                  <SelectItem value="Teclado">Teclado</SelectItem>
                  <SelectItem value="Bateria">Bateria</SelectItem>
                  <SelectItem value="Violão">Violão</SelectItem>
                  <SelectItem value="Contra-baixo">Contra-baixo</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="experienceLevel">Nível de Experiência *</Label>
              <Select
                value={formData.experienceLevel}
                onValueChange={(value) => setFormData({ ...formData, experienceLevel: value as ExperienceLevel })}
              >
                <SelectTrigger id="experienceLevel">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Iniciante">Iniciante</SelectItem>
                  <SelectItem value="Intermediário">Intermediário</SelectItem>
                  <SelectItem value="Avançado">Avançado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="packageType">Tipo de Pacote *</Label>
              <Select
                value={formData.packageType}
                onValueChange={(value) => setFormData({ ...formData, packageType: value as PackageType })}
              >
                <SelectTrigger id="packageType">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Individual">Individual - R$ 120/mês</SelectItem>
                  <SelectItem value="Grupo">Grupo - R$ 108/mês</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="availableForGroup">Disponível para Aula em Grupo *</Label>
              <Select
                value={formData.availableForGroup ? "sim" : "nao"}
                onValueChange={(value) => setFormData({ ...formData, availableForGroup: value === "sim" })}
              >
                <SelectTrigger id="availableForGroup">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sim">Sim</SelectItem>
                  <SelectItem value="nao">Não</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="objectives">Objetivos</Label>
            <Textarea
              id="objectives"
              value={formData.objectives}
              onChange={(e) => setFormData({ ...formData, objectives: e.target.value })}
              placeholder="Ex: Tocar em uma banda, aprender por hobby..."
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">{student ? "Salvar Alterações" : "Cadastrar Aluno"}</Button>
      </div>
    </form>
  )
}
