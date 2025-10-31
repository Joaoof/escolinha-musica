import type { User } from "./types"

const STORAGE_KEY = "music_school_auth"

// Mock users for demonstration
const MOCK_USERS: User[] = [
  {
    id: "admin-1",
    email: "admin@escola.com",
    password: "admin123",
    role: "admin",
    name: "Administrador",
  },
]

export function getUsers(): User[] {
  if (typeof window === "undefined") return MOCK_USERS

  const schoolData = localStorage.getItem("music-school-data")

  if (schoolData) {
    const data = JSON.parse(schoolData)
    const students = data.students || []

    // Create a student user for each student (using email as login)
    const studentUsers = students.slice(0, 10).map((student: any) => ({
      id: `user-${student.id}`,
      email: student.email,
      password: "aluno123",
      role: "student" as const,
      studentId: student.id,
      name: student.name,
    }))

    return [...MOCK_USERS, ...studentUsers]
  }

  return MOCK_USERS
}

export function authenticateUser(email: string, password: string): User | null {
  const users = getUsers()
  const user = users.find((u) => u.email === email && u.password === password)
  return user || null
}

export function saveAuthUser(user: User): void {
  if (typeof window === "undefined") return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
}

export function getAuthUser(): User | null {
  if (typeof window === "undefined") return null
  const data = localStorage.getItem(STORAGE_KEY)
  return data ? JSON.parse(data) : null
}

export function clearAuthUser(): void {
  if (typeof window === "undefined") return
  localStorage.removeItem(STORAGE_KEY)
}
