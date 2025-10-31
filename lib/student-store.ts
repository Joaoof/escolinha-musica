"use client"

import type { Student, Payment } from "./types"
import { mockStudents, mockPayments } from "./mock-data"

class StudentStore {
  private students: Student[] = []
  private payments: Payment[] = []
  private listeners: Set<() => void> = new Set()

  constructor() {
    if (typeof window !== "undefined") {
      this.loadFromStorage()
    }
  }

  private loadFromStorage() {
    const stored = localStorage.getItem("music-school-data")
    if (stored) {
      const data = JSON.parse(stored)
      this.students = data.students
      this.payments = data.payments
    } else {
      this.students = mockStudents
      this.payments = mockPayments
      this.saveToStorage()
    }
  }

  private saveToStorage() {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "music-school-data",
        JSON.stringify({
          students: this.students,
          payments: this.payments,
        }),
      )
    }
  }

  private notify() {
    this.listeners.forEach((listener) => listener())
  }

  subscribe(listener: () => void) {
    this.listeners.add(listener)
    return () => this.listeners.delete(listener)
  }

  getStudents() {
    return this.students
  }

  getStudent(id: string) {
    return this.students.find((s) => s.id === id)
  }

  getPayments(studentId?: string) {
    if (studentId) {
      return this.payments.filter((p) => p.studentId === studentId)
    }
    return this.payments
  }

  updateStudent(id: string, updates: Partial<Student>) {
    const index = this.students.findIndex((s) => s.id === id)
    if (index !== -1) {
      this.students[index] = { ...this.students[index], ...updates }
      this.saveToStorage()
      this.notify()
    }
  }

  addStudent(student: Omit<Student, "id">) {
    const newId = `STD${String(this.students.length + 1).padStart(4, "0")}`
    const newStudent: Student = { ...student, id: newId }
    this.students.push(newStudent)
    this.saveToStorage()
    this.notify()
    return newStudent
  }

  deleteStudent(id: string) {
    this.students = this.students.filter((s) => s.id !== id)
    this.payments = this.payments.filter((p) => p.studentId !== id)
    this.saveToStorage()
    this.notify()
  }

  recordPayment(studentId: string, month: string) {
    const student = this.getStudent(studentId)
    if (!student) return

    const payment = this.payments.find((p) => p.studentId === studentId && p.month === month)
    if (payment) {
      payment.paidDate = new Date().toISOString().split("T")[0]
      payment.status = "Pago"
    }

    this.updateStudent(studentId, {
      lastPaymentDate: new Date().toISOString().split("T")[0],
      paymentStatus: "Pago",
      overdueMonths: 0,
    })

    this.saveToStorage()
    this.notify()
  }
}

export const studentStore = new StudentStore()

export function getStudents() {
  return studentStore.getStudents()
}

export function getStudent(id: string) {
  return studentStore.getStudent(id)
}

export function getPayments(studentId?: string) {
  return studentStore.getPayments(studentId)
}

export function updateStudent(id: string, updates: Partial<Student>) {
  return studentStore.updateStudent(id, updates)
}

export function addStudent(student: Omit<Student, "id">) {
  return studentStore.addStudent(student)
}

export function deleteStudent(id: string) {
  return studentStore.deleteStudent(id)
}

export function recordPayment(studentId: string, month: string) {
  return studentStore.recordPayment(studentId, month)
}
