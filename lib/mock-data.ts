import type { Student, Payment, Instrument, ExperienceLevel, PackageType, PaymentStatus } from "./types"

const instruments: Instrument[] = ["Guitarra", "Teclado", "Bateria", "Violão", "Contra-baixo"]
const experienceLevels: ExperienceLevel[] = ["Iniciante", "Intermediário", "Avançado"]
const packageTypes: PackageType[] = ["Individual", "Grupo"]

const firstNames = [
  "João",
  "Maria",
  "Pedro",
  "Ana",
  "Lucas",
  "Juliana",
  "Carlos",
  "Fernanda",
  "Rafael",
  "Camila",
  "Bruno",
  "Beatriz",
  "Felipe",
  "Larissa",
  "Gustavo",
  "Amanda",
  "Rodrigo",
  "Gabriela",
  "Thiago",
  "Mariana",
  "Diego",
  "Letícia",
  "Matheus",
  "Isabela",
  "Vinicius",
  "Carolina",
  "Leonardo",
  "Natália",
  "Gabriel",
  "Bianca",
  "André",
  "Patrícia",
  "Marcelo",
  "Renata",
  "Ricardo",
  "Vanessa",
  "Paulo",
  "Cristina",
  "Fábio",
  "Adriana",
  "Daniel",
  "Tatiana",
  "Alexandre",
  "Priscila",
  "Leandro",
  "Daniela",
  "Henrique",
  "Luciana",
  "Caio",
  "Aline",
]

const lastNames = [
  "Silva",
  "Santos",
  "Oliveira",
  "Souza",
  "Rodrigues",
  "Ferreira",
  "Alves",
  "Pereira",
  "Lima",
  "Gomes",
  "Costa",
  "Ribeiro",
  "Martins",
  "Carvalho",
  "Rocha",
  "Almeida",
  "Nascimento",
  "Araújo",
  "Melo",
  "Barbosa",
  "Cardoso",
  "Correia",
  "Dias",
  "Teixeira",
  "Monteiro",
  "Mendes",
  "Barros",
  "Freitas",
  "Pinto",
  "Moreira",
]

const objectives = [
  "Tocar em uma banda",
  "Aprender por hobby",
  "Tocar na igreja",
  "Desenvolvimento pessoal",
  "Carreira profissional",
  "Tocar em eventos",
  "Gravar músicas",
  "Ensinar música",
]

function randomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)]
}

function randomDate(start: Date, end: Date): Date {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}

function generatePhone(): string {
  const ddd = Math.floor(Math.random() * 89) + 11
  const number = Math.floor(Math.random() * 900000000) + 100000000
  return `(${ddd}) 9${number.toString().substring(0, 4)}-${number.toString().substring(4, 8)}`
}

function generateEmail(name: string): string {
  const cleanName = name.toLowerCase().replace(/\s+/g, ".")
  const domains = ["gmail.com", "hotmail.com", "outlook.com", "yahoo.com.br"]
  return `${cleanName}@${randomItem(domains)}`
}

function calculatePaymentStatus(
  lastPaymentDate: string | null,
  enrollmentDate: string,
): { status: PaymentStatus; overdueMonths: number } {
  const now = new Date()
  const enrollment = new Date(enrollmentDate)

  if (!lastPaymentDate) {
    const monthsSinceEnrollment = Math.floor((now.getTime() - enrollment.getTime()) / (1000 * 60 * 60 * 24 * 30))
    if (monthsSinceEnrollment > 1) {
      return { status: "Atrasado", overdueMonths: monthsSinceEnrollment }
    }
    return { status: "Pendente", overdueMonths: 0 }
  }

  const lastPayment = new Date(lastPaymentDate)
  const daysSincePayment = Math.floor((now.getTime() - lastPayment.getTime()) / (1000 * 60 * 60 * 24))

  if (daysSincePayment > 35) {
    const overdueMonths = Math.floor(daysSincePayment / 30)
    return { status: "Atrasado", overdueMonths }
  } else if (daysSincePayment > 25) {
    return { status: "Pendente", overdueMonths: 0 }
  }

  return { status: "Pago", overdueMonths: 0 }
}

export function generateMockStudents(count = 1000): Student[] {
  const students: Student[] = []
  const startDate = new Date("2023-01-01")
  const endDate = new Date("2024-12-31")

  for (let i = 0; i < count; i++) {
    const name = `${randomItem(firstNames)} ${randomItem(lastNames)}`
    const packageType = randomItem(packageTypes)
    const monthlyFee = packageType === "Individual" ? 120 : 108
    const enrollmentDate = randomDate(startDate, endDate).toISOString().split("T")[0]

    // 70% dos alunos pagaram recentemente, 20% estão pendentes, 10% atrasados
    const paymentRandom = Math.random()
    let lastPaymentDate: string | null

    if (paymentRandom < 0.7) {
      // Pagamento recente (últimos 25 dias)
      lastPaymentDate = randomDate(new Date(Date.now() - 25 * 24 * 60 * 60 * 1000), new Date())
        .toISOString()
        .split("T")[0]
    } else if (paymentRandom < 0.9) {
      // Pagamento pendente (26-35 dias)
      lastPaymentDate = randomDate(
        new Date(Date.now() - 35 * 24 * 60 * 60 * 1000),
        new Date(Date.now() - 26 * 24 * 60 * 60 * 1000),
      )
        .toISOString()
        .split("T")[0]
    } else {
      // Pagamento atrasado (mais de 35 dias)
      lastPaymentDate = randomDate(
        new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
        new Date(Date.now() - 36 * 24 * 60 * 60 * 1000),
      )
        .toISOString()
        .split("T")[0]
    }

    const { status, overdueMonths } = calculatePaymentStatus(lastPaymentDate, enrollmentDate)

    students.push({
      id: `STD${String(i + 1).padStart(4, "0")}`,
      name,
      email: generateEmail(name),
      phone: generatePhone(),
      age: Math.floor(Math.random() * 50) + 10,
      instrument: randomItem(instruments),
      experienceLevel: randomItem(experienceLevels),
      objectives: randomItem(objectives),
      availableForGroup: Math.random() > 0.3,
      packageType,
      monthlyFee,
      enrollmentDate,
      lastPaymentDate,
      paymentStatus: status,
      overdueMonths,
    })
  }

  return students.sort((a, b) => a.name.localeCompare(b.name))
}

export function generateMockPayments(students: Student[]): Payment[] {
  const payments: Payment[] = []
  const months = [
    "2024-01",
    "2024-02",
    "2024-03",
    "2024-04",
    "2024-05",
    "2024-06",
    "2024-07",
    "2024-08",
    "2024-09",
    "2024-10",
    "2024-11",
    "2024-12",
  ]

  students.forEach((student) => {
    const enrollmentMonth = student.enrollmentDate.substring(0, 7)
    const relevantMonths = months.filter((m) => m >= enrollmentMonth)

    relevantMonths.forEach((month, index) => {
      const dueDate = `${month}-05`
      const isPaid = student.lastPaymentDate ? month <= student.lastPaymentDate.substring(0, 7) : false

      payments.push({
        id: `PAY${student.id}${month.replace("-", "")}`,
        studentId: student.id,
        amount: student.monthlyFee,
        dueDate,
        paidDate: isPaid
          ? randomDate(new Date(`${month}-01`), new Date(`${month}-10`))
              .toISOString()
              .split("T")[0]
          : null,
        status: isPaid ? "Pago" : new Date() > new Date(dueDate) ? "Atrasado" : "Pendente",
        month,
      })
    })
  })

  return payments
}

// Initialize mock data
export const mockStudents = generateMockStudents(1000)
export const mockPayments = generateMockPayments(mockStudents)
