"use client"

import { useEffect, useState } from "react"
import { studentStore } from "@/lib/student-store"
import type { Student, Payment } from "@/lib/types"

export function useStudents() {
  const [students, setStudents] = useState<Student[]>([])

  useEffect(() => {
    setStudents(studentStore.getStudents())

    const unsubscribe = studentStore.subscribe(() => {
      setStudents(studentStore.getStudents())
    })

    return unsubscribe
  }, [])

  return students
}

export function useStudent(id: string) {
  const [student, setStudent] = useState<Student | undefined>()

  useEffect(() => {
    setStudent(studentStore.getStudent(id))

    const unsubscribe = studentStore.subscribe(() => {
      setStudent(studentStore.getStudent(id))
    })

    return unsubscribe
  }, [id])

  return student
}

export function usePayments(studentId?: string) {
  const [payments, setPayments] = useState<Payment[]>([])

  useEffect(() => {
    setPayments(studentStore.getPayments(studentId))

    const unsubscribe = studentStore.subscribe(() => {
      setPayments(studentStore.getPayments(studentId))
    })

    return unsubscribe
  }, [studentId])

  return payments
}
