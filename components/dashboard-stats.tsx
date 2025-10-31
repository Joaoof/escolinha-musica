"use client"

import { useStudents } from "@/hooks/use-students"
import { useMemo } from "react"
import { motion } from "framer-motion"
import type React from "react"
import {
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"
import {
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Clock,
  Target,
  Activity,
  BarChart3,
  PieChartIcon,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  Shield,
} from "lucide-react"

// --- Tipagens ---
interface Student {
  id: string
  name: string
  monthlyFee: number
  paymentStatus: "Pago" | "Pendente" | "Atrasado" | "Inativo"
  lastPaymentDate: Date | null
  enrollmentDate: Date
}

interface DashboardMetrics {
  totalStudents: number
  activeStudents: number
  inactiveStudents: number
  pendingPayments: number
  overduePayments: number
  monthlyRevenue: number
  pendingRevenue: number
  overdueRevenue: number
  expectedRevenue: number
  avgMonthlyPerStudent: number
  monthlyGrowth: number
  churnRate: number
  revenueProgress: number
  activePercent: number
  mrr: number
  arr: number
  ltv: number
  cac: number
  paymentCollectionRate: number
}

// --- Funções Utilitárias ---
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  }).format(amount)
}

const formatK = (amount: number) => {
  if (amount >= 1000000) {
    return `R$ ${(amount / 1000000).toFixed(1)}M`
  }
  if (amount >= 1000) {
    return `R$ ${(amount / 1000).toFixed(1)}K`
  }
  return formatCurrency(amount)
}

// --- Componente: KPI Card ---
interface KPICardProps {
  title: string
  value: string | number
  icon: React.ReactNode
  trend?: number
  trendLabel?: string
  colorClass: string
  delay: number
  subtitle?: string
}

function KPICard({ title, value, icon, trend, trendLabel, colorClass, delay, subtitle }: KPICardProps) {
  const isPositive = trend && trend > 0
  const isNegative = trend && trend < 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="relative p-6 rounded-xl bg-gradient-to-br from-slate-900/90 to-slate-800/90 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300 group overflow-hidden"
    >
      <div
        className={`absolute top-0 right-0 w-32 h-32 ${colorClass} opacity-5 blur-3xl group-hover:opacity-10 transition-opacity`}
      ></div>

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 rounded-lg ${colorClass} bg-opacity-10`}>{icon}</div>
          {trend !== undefined && (
            <div
              className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold ${isPositive
                ? "bg-emerald-500/10 text-emerald-400"
                : isNegative
                  ? "bg-red-500/10 text-red-400"
                  : "bg-slate-500/10 text-slate-400"
                }`}
            >
              {isPositive ? (
                <ArrowUpRight className="w-3 h-3" />
              ) : isNegative ? (
                <ArrowDownRight className="w-3 h-3" />
              ) : null}
              {Math.abs(trend)}%
            </div>
          )}
        </div>

        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">{title}</h3>

        <p className="text-3xl font-extrabold text-white mb-1">{value}</p>

        {(trendLabel || subtitle) && <p className="text-xs text-slate-500">{trendLabel || subtitle}</p>}
      </div>
    </motion.div>
  )
}

// --- Componente: Revenue Chart ---
function RevenueChart({ delay }: { delay: number }) {
  const monthlyData = [
    { month: "Jan", receita: 45000, meta: 50000, despesas: 15000 },
    { month: "Fev", receita: 52000, meta: 55000, despesas: 16000 },
    { month: "Mar", receita: 48000, meta: 55000, despesas: 14500 },
    { month: "Abr", receita: 61000, meta: 60000, despesas: 17000 },
    { month: "Mai", receita: 55000, meta: 60000, despesas: 15500 },
    { month: "Jun", receita: 67000, meta: 65000, despesas: 18000 },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="p-6 rounded-xl bg-gradient-to-br from-slate-900/90 to-slate-800/90 border border-slate-700/50"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-400" />
            Evolução de Receita
          </h3>
          <p className="text-sm text-slate-400 mt-1">Últimos 6 meses - Receita vs Meta vs Despesas</p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={monthlyData}>
          <defs>
            <linearGradient id="colorReceita" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorMeta" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
          <XAxis dataKey="month" stroke="#94a3b8" style={{ fontSize: "12px" }} />
          <YAxis stroke="#94a3b8" style={{ fontSize: "12px" }} tickFormatter={(value) => `R$ ${value / 1000}k`} />
          <Tooltip
            contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: "8px" }}
            labelStyle={{ color: "#f1f5f9" }}
            formatter={(value: number) => formatCurrency(value)}
          />
          <Legend wrapperStyle={{ fontSize: "12px" }} />
          <Area
            type="monotone"
            dataKey="receita"
            stroke="#3b82f6"
            fillOpacity={1}
            fill="url(#colorReceita)"
            strokeWidth={2}
            name="Receita"
          />
          <Area
            type="monotone"
            dataKey="meta"
            stroke="#10b981"
            fillOpacity={1}
            fill="url(#colorMeta)"
            strokeWidth={2}
            strokeDasharray="5 5"
            name="Meta"
          />
          <Line type="monotone" dataKey="despesas" stroke="#ef4444" strokeWidth={2} name="Despesas" />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  )
}

// --- Componente: Student Distribution Chart ---
function StudentDistributionChart({ stats, delay }: { stats: DashboardMetrics; delay: number }) {
  const data = [
    { name: "Ativos", value: stats.activeStudents, color: "#10b981" },
    { name: "Pendentes", value: stats.pendingPayments, color: "#3b82f6" },
    { name: "Atrasados", value: stats.overduePayments, color: "#f59e0b" },
    { name: "Inativos", value: stats.inactiveStudents, color: "#ef4444" },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="p-6 rounded-xl bg-gradient-to-br from-slate-900/90 to-slate-800/90 border border-slate-700/50"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <PieChartIcon className="w-5 h-5 text-purple-400" />
            Distribuição de Alunos
          </h3>
          <p className="text-sm text-slate-400 mt-1">Por status de pagamento</p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <ResponsiveContainer width="50%" height={200}>
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: "8px" }}
              formatter={(value: number) => `${value} alunos`}
            />
          </PieChart>
        </ResponsiveContainer>

        <div className="flex-1 space-y-3">
          {data.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-sm text-slate-300">{item.name}</span>
              </div>
              <span className="text-sm font-bold text-white">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

// --- Componente: Performance Radar ---
function PerformanceRadar({ stats, delay }: { stats: DashboardMetrics; delay: number }) {
  const data = [
    { metric: "Receita", value: (stats.revenueProgress / 100) * 100, fullMark: 100 },
    {
      metric: "Retenção",
      value: ((stats.totalStudents - stats.inactiveStudents) / stats.totalStudents) * 100,
      fullMark: 100,
    },
    { metric: "Cobrança", value: stats.paymentCollectionRate, fullMark: 100 },
    { metric: "Crescimento", value: Math.min(stats.monthlyGrowth * 10, 100), fullMark: 100 },
    { metric: "Engajamento", value: (stats.activeStudents / stats.totalStudents) * 100, fullMark: 100 },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="p-6 rounded-xl bg-gradient-to-br from-slate-900/90 to-slate-800/90 border border-slate-700/50"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Activity className="w-5 h-5 text-cyan-400" />
            Radar de Performance
          </h3>
          <p className="text-sm text-slate-400 mt-1">Análise multidimensional</p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <RadarChart data={data}>
          <PolarGrid stroke="#334155" />
          <PolarAngleAxis dataKey="metric" stroke="#94a3b8" style={{ fontSize: "12px" }} />
          <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#94a3b8" style={{ fontSize: "10px" }} />
          <Radar name="Performance" dataKey="value" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.6} />
          <Tooltip
            contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: "8px" }}
            formatter={(value: number) => `${value.toFixed(1)}%`}
          />
        </RadarChart>
      </ResponsiveContainer>
    </motion.div>
  )
}

// --- Componente: Growth Trend ---
function GrowthTrend({ delay }: { delay: number }) {
  const growthData = [
    { month: "Jan", alunos: 120, novos: 15, saidas: 5 },
    { month: "Fev", alunos: 130, novos: 18, saidas: 8 },
    { month: "Mar", alunos: 140, novos: 20, saidas: 10 },
    { month: "Abr", alunos: 155, novos: 22, saidas: 7 },
    { month: "Mai", alunos: 170, novos: 25, saidas: 10 },
    { month: "Jun", alunos: 185, novos: 28, saidas: 13 },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="p-6 rounded-xl bg-gradient-to-br from-slate-900/90 to-slate-800/90 border border-slate-700/50"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            Tendência de Crescimento
          </h3>
          <p className="text-sm text-slate-400 mt-1">Evolução da base de alunos</p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={growthData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
          <XAxis dataKey="month" stroke="#94a3b8" style={{ fontSize: "12px" }} />
          <YAxis stroke="#94a3b8" style={{ fontSize: "12px" }} />
          <Tooltip
            contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: "8px" }}
            labelStyle={{ color: "#f1f5f9" }}
          />
          <Legend wrapperStyle={{ fontSize: "12px" }} />
          <Bar dataKey="alunos" fill="#3b82f6" radius={[8, 8, 0, 0]} name="Total de Alunos" />
          <Bar dataKey="novos" fill="#10b981" radius={[8, 8, 0, 0]} name="Novos Alunos" />
          <Bar dataKey="saidas" fill="#ef4444" radius={[8, 8, 0, 0]} name="Saídas" />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  )
}

// --- Componente: Alert Banner ---
function AlertBanner({ stats }: { stats: DashboardMetrics }) {
  const alerts = []

  if (stats.overduePayments > 0) {
    alerts.push({
      type: "critical",
      icon: <AlertTriangle className="w-5 h-5" />,
      message: `${stats.overduePayments} pagamentos atrasados (${formatCurrency(stats.overdueRevenue)})`,
      action: "Revisar agora",
    })
  }

  if (stats.churnRate > 5) {
    alerts.push({
      type: "warning",
      icon: <TrendingDown className="w-5 h-5" />,
      message: `Taxa de evasão em ${stats.churnRate.toFixed(1)}% - acima do ideal`,
      action: "Analisar causas",
    })
  }

  if (stats.revenueProgress < 80) {
    alerts.push({
      type: "info",
      icon: <Target className="w-5 h-5" />,
      message: `Receita em ${stats.revenueProgress.toFixed(0)}% da meta mensal`,
      action: "Ver detalhes",
    })
  }

  if (alerts.length === 0) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-3"
    >
      {alerts.map((alert, index) => (
        <div
          key={index}
          className={`p-4 rounded-lg border flex items-center justify-between ${alert.type === "critical"
            ? "bg-red-500/10 border-red-500/30"
            : alert.type === "warning"
              ? "bg-orange-500/10 border-orange-500/30"
              : "bg-blue-500/10 border-blue-500/30"
            }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`${alert.type === "critical"
                ? "text-red-400"
                : alert.type === "warning"
                  ? "text-orange-400"
                  : "text-blue-400"
                }`}
            >
              {alert.icon}
            </div>
            <span className="text-sm font-medium text-white">{alert.message}</span>
          </div>
          <button
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors ${alert.type === "critical"
              ? "bg-red-500/20 text-red-300 hover:bg-red-500/30"
              : alert.type === "warning"
                ? "bg-orange-500/20 text-orange-300 hover:bg-orange-500/30"
                : "bg-blue-500/20 text-blue-300 hover:bg-blue-500/30"
              }`}
          >
            {alert.action}
          </button>
        </div>
      ))}
    </motion.div>
  )
}

// --- Componente Principal ---
export function DashboardStats() {
  const students: Student[] = useStudents() as Student[]

  const stats: DashboardMetrics = useMemo(() => {
    const totalStudents = students.length
    const activeStudentsList = students.filter((s) => s.paymentStatus === "Pago")
    const pendingStudentsList = students.filter((s) => s.paymentStatus === "Pendente")
    const overdueStudentsList = students.filter((s) => s.paymentStatus === "Atrasado")
    const inactiveStudentsList = students.filter((s) => s.paymentStatus === "Inativo")

    const monthlyRevenue = activeStudentsList.reduce((sum, s) => sum + s.monthlyFee, 0)
    const pendingRevenue = pendingStudentsList.reduce((sum, s) => sum + s.monthlyFee, 0)
    const overdueRevenue = overdueStudentsList.reduce((sum, s) => sum + s.monthlyFee, 0)
    const expectedRevenue = monthlyRevenue + pendingRevenue + overdueRevenue

    const activeCount = activeStudentsList.length
    const pendingCount = pendingStudentsList.length
    const overdueCount = overdueStudentsList.length
    const inactiveCount = inactiveStudentsList.length

    const avgMonthlyPerStudent = activeCount > 0 ? monthlyRevenue / activeCount : 0
    const monthlyGrowth = 8.5
    const churnRate = totalStudents > 0 ? (inactiveCount / totalStudents) * 100 : 0
    const activePercent = totalStudents > 0 ? (activeCount / totalStudents) * 100 : 0
    const revenueProgress = expectedRevenue > 0 ? (monthlyRevenue / expectedRevenue) * 100 : 0

    // Métricas Avançadas
    const mrr = monthlyRevenue // Monthly Recurring Revenue
    const arr = mrr * 12 // Annual Recurring Revenue
    const ltv = avgMonthlyPerStudent * 24 // Lifetime Value (assumindo 24 meses)
    const cac = 150 // Customer Acquisition Cost (exemplo)
    const paymentCollectionRate = totalStudents > 0 ? ((activeCount + pendingCount) / totalStudents) * 100 : 0

    return {
      totalStudents,
      activeStudents: activeCount,
      pendingPayments: pendingCount,
      overduePayments: overdueCount,
      inactiveStudents: inactiveCount,
      monthlyRevenue,
      pendingRevenue,
      overdueRevenue,
      expectedRevenue,
      avgMonthlyPerStudent,
      monthlyGrowth,
      churnRate,
      revenueProgress,
      activePercent,
      mrr,
      arr,
      ltv,
      cac,
      paymentCollectionRate,
    }
  }, [students])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between pb-6 border-b border-slate-800"
      >
        <div>
          <h1 className="text-4xl font-extrabold text-white mb-2 tracking-tight">Dashboard Financeiro Executivo</h1>
          <p className="text-slate-400 text-lg">
            Análise Completa de Performance •{" "}
            {new Date().toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm text-slate-500">Base Total</p>
            <p className="text-2xl font-bold text-white">{stats.totalStudents}</p>
          </div>
          <div className="w-px h-12 bg-slate-700"></div>
          <div className="text-right">
            <p className="text-sm text-slate-500">MRR</p>
            <p className="text-2xl font-bold text-emerald-400">{formatK(stats.mrr)}</p>
          </div>
        </div>
      </motion.div>

      {/* Alert Banner */}
      <AlertBanner stats={stats} />

      {/* KPI Grid - Linha 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Receita Mensal (MRR)"
          value={formatK(stats.mrr)}
          icon={<img src={"https://cdn-icons-png.flaticon.com/512/10397/10397461.png"} className="w-10 h-10" />}
          trend={stats.monthlyGrowth}
          trendLabel="vs. mês anterior"
          colorClass="b="
          delay={0.1}
        />

        <KPICard
          title="Receita Anual (ARR)"
          value={formatK(stats.arr)}
          icon={<img src={"https://cdn-icons-png.flaticon.com/512/1434/1434986.png"} className="w-10 h-10 text-blue-400" />}
          subtitle="Projeção anualizada"
          colorClass=""
          delay={0.15}
        />

        <KPICard
          title="Alunos Ativos"
          value={stats.activeStudents}
          icon={<img src={"https://cdn-icons-png.flaticon.com/512/2995/2995620.png"} className="w-10 h-10 text-purple-400" />}
          trend={12.5}
          trendLabel={`${stats.activePercent.toFixed(1)}% da base`}
          colorClass=""
          delay={0.2}
        />

        <KPICard
          title="Taxa de Cobrança"
          value={`${stats.paymentCollectionRate.toFixed(1)}%`}
          icon={<img src={"https://cdn-icons-png.flaticon.com/512/3898/3898058.png"} className="w-10 h-10 text-cyan-400" />}
          trend={3.2}
          trendLabel="Eficiência de cobrança"
          colorClass=""
          delay={0.25}
        />
      </div>

      {/* KPI Grid - Linha 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Lifetime Value (LTV)"
          value={formatCurrency(stats.ltv)}
          icon={<img src={"https://cdn-icons-png.flaticon.com/512/6050/6050331.png"} className="w-10 h-10 text-indigo-400" />}
          subtitle="Valor médio por aluno"
          colorClass=""
          delay={0.3}
        />

        <KPICard
          title="CAC (Custo Aquisição)"
          value={formatCurrency(stats.cac)}
          icon={<Zap className="w-6 h-6 text-yellow-400" />}
          subtitle={`LTV/CAC: ${(stats.ltv / stats.cac).toFixed(1)}x`}
          colorClass="bg-yellow-500"
          delay={0.35}
        />

        <KPICard
          title="Pagamentos Atrasados"
          value={stats.overduePayments}
          icon={<AlertTriangle className="w-6 h-6 text-red-400" />}
          trend={-15}
          trendLabel={formatCurrency(stats.overdueRevenue)}
          colorClass="bg-red-500"
          delay={0.4}
        />

        <KPICard
          title="Taxa de Evasão (Churn)"
          value={`${stats.churnRate.toFixed(1)}%`}
          icon={<Shield className="w-6 h-6 text-orange-400" />}
          trend={-2.3}
          trendLabel={`${stats.inactiveStudents} alunos inativos`}
          colorClass="bg-orange-500"
          delay={0.45}
        />
      </div>

      {/* Charts Grid - Linha 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart delay={0.5} />
        <GrowthTrend delay={0.55} />
      </div>

      {/* Charts Grid - Linha 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <StudentDistributionChart stats={stats} delay={0.6} />
        <PerformanceRadar stats={stats} delay={0.65} />
      </div>

      {/* Footer Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.7 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <div className="p-6 rounded-xl bg-gradient-to-br from-emerald-900/20 to-emerald-800/20 border border-emerald-700/30">
          <div className="flex items-center gap-3 mb-3">
            <CheckCircle className="w-5 h-5 text-emerald-400" />
            <h4 className="text-sm font-bold text-emerald-300 uppercase tracking-wider">Pontos Fortes</h4>
          </div>
          <p className="text-white font-semibold mb-1">Crescimento Consistente</p>
          <p className="text-sm text-slate-400">
            Base de alunos crescendo {stats.monthlyGrowth}% ao mês com LTV/CAC saudável de{" "}
            {(stats.ltv / stats.cac).toFixed(1)}x
          </p>
        </div>

        <div className="p-6 rounded-xl bg-gradient-to-br from-orange-900/20 to-orange-800/20 border border-orange-700/30">
          <div className="flex items-center gap-3 mb-3">
            <Clock className="w-5 h-5 text-orange-400" />
            <h4 className="text-sm font-bold text-orange-300 uppercase tracking-wider">Atenção Necessária</h4>
          </div>
          <p className="text-white font-semibold mb-1">Pagamentos Pendentes</p>
          <p className="text-sm text-slate-400">
            {formatCurrency(stats.pendingRevenue + stats.overdueRevenue)} em receita a ser coletada
          </p>
        </div>

        <div className="p-6 rounded-xl bg-gradient-to-br from-blue-900/20 to-blue-800/20 border border-blue-700/30">
          <div className="flex items-center gap-3 mb-3">
            <Target className="w-5 h-5 text-blue-400" />
            <h4 className="text-sm font-bold text-blue-300 uppercase tracking-wider">Próxima Meta</h4>
          </div>
          <p className="text-white font-semibold mb-1">Atingir {formatK(stats.expectedRevenue * 1.15)}</p>
          <p className="text-sm text-slate-400">15% de crescimento no próximo trimestre</p>
        </div>
      </motion.div>
    </div>
  )
}
