"use client"

import { useAuth } from "@/contexts/auth-context"
import { DashboardStats } from "@/components/dashboard-stats"
import { RecentStudents } from "@/components/recent-students"
import { PaymentOverview } from "@/components/payment-overview"
import { StudentDashboard } from "@/components/student-dashboard"
import { Open_Sans } from "next/font/google"

const openSans = Open_Sans({ subsets: ["latin"] })

export default function DashboardPage() {
  const { isAdmin, isStudent } = useAuth()

  if (isStudent) {
    return (
      <div className="p-8">
        <StudentDashboard />
      </div>
    )
  }

  return (
    <div className="space-y-6 p-8">
      <div>
        <h1 className={`${openSans.className} text-3xl  text-foreground`}>Dashboard</h1>
        <p className="text-muted-foreground">Visão geral da sua escola de música</p>
      </div>

      <DashboardStats />

      <div className="grid gap-6 lg:grid-cols-2">
        <RecentStudents />
        <PaymentOverview />
      </div>
    </div>
  )
}
