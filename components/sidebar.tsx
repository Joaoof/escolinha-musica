"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { LogOut } from "lucide-react" // Mantemos LogOut por ser um ícone de ação universal
import { cn } from "@/lib/utils"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"

// --- URLs das Imagens para a Navegação ---
const ICON_URLS = {
  // Shared & Admin
  DASHBOARD: "https://cdn-icons-png.flaticon.com/512/6821/6821002.png", // Gráfico
  USERS: "https://cdn-icons-png.flaticon.com/512/33/33308.png", // Grupo
  PAYMENTS: "https://cdn-icons-png.flaticon.com/512/13/13694.png", // Cartão de crédito/moeda
  WHATSAPP: "https://cdn-icons-png.flaticon.com/512/1384/1384162.png", // WhatsApp

  // Student
  PROFILE: "https://cdn-icons-png.flaticon.com/512/1077/1077114.png", // Usuário individual
  STUDENT_PAYMENTS: "https://cdn-icons-png.flaticon.com/512/867/867909.png", // Extrato/Histórico de Pagamentos

  // Branding
  LOGO: "https://cdn-icons-png.flaticon.com/512/2995/2995101.png", // Nota Musical ou instrumento
}

// --- Definições de Navegação Atualizadas (usando iconUrl) ---
interface NavItem {
  name: string
  href: string
  iconUrl: string
}

const adminNavigation: NavItem[] = [
  { name: "Dashboard", href: "/", iconUrl: ICON_URLS.DASHBOARD },
  { name: "Alunos", href: "/alunos", iconUrl: ICON_URLS.USERS },
  { name: "Pagamentos", href: "/pagamentos", iconUrl: ICON_URLS.PAYMENTS },
  { name: "WhatsApp", href: "/whatsapp", iconUrl: ICON_URLS.WHATSAPP },
]

const studentNavigation: NavItem[] = [
  { name: "Meu Painel", href: "/", iconUrl: ICON_URLS.DASHBOARD },
  { name: "Meus Dados", href: "/meu-perfil", iconUrl: ICON_URLS.PROFILE },
  { name: "Meus Pagamentos", href: "/meus-pagamentos", iconUrl: ICON_URLS.STUDENT_PAYMENTS },
]

export function Sidebar() {
  const pathname = usePathname()
  const { user, logout, isAdmin } = useAuth()
  const router = useRouter()

  const navigation = isAdmin ? adminNavigation : studentNavigation

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  return (
    <div className="flex h-screen w-64 flex-col border-r border-slate-800 bg-[#0a0a0a] text-white shadow-2xl">

      {/* --- 1. Branding (Topo Elegante) --- */}
      <div className="flex h-16 items-center gap-3 border-b border-slate-800 px-6">
        <img src={ICON_URLS.LOGO} alt="Logo" className="h-6 w-6 object-contain filter invert" />
        <span className="text-xl font-extrabold tracking-wide">Escola Music</span>
      </div>

      {/* --- 2. Perfil do Usuário --- */}
      <div className="border-b border-slate-800 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500 text-lg font-bold">
            {user?.name.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="truncate text-sm font-medium text-white">{user?.name}</p>
            <p className="text-xs text-slate-400 font-light">{isAdmin ? "Administrador" : "Aluno Ativo"}</p>
          </div>
        </div>
      </div>

      {/* --- 3. Links de Navegação (Imagens) --- */}
      <nav className="flex-1 space-y-1 p-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href

          // Estilo de link ativo mais marcante
          const linkClass = cn(
            "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200",
            isActive
              ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
              : "text-slate-300 hover:bg-slate-800 hover:text-white",
          )

          // Estilo da imagem (inverte a cor da imagem em modo escuro para melhor contraste)
          const imgClass = cn(
            "h-5 w-5 object-contain",
            isActive ? "filter brightness-0 invert" : "filter invert opacity-70 group-hover:opacity-100"
          )

          return (
            <Link
              key={item.name}
              href={item.href}
              className={linkClass}
            >
              <img
                src={item.iconUrl}
                alt={`${item.name} icon`}
                className={imgClass}
                onError={(e) => { e.currentTarget.style.opacity = '0.3'; }} // Fallback simples
              />
              {item.name}
            </Link>
          )
        })}
      </nav>

      {/* --- 4. Rodapé e Sair --- */}
      <div className="border-t border-slate-800 p-4 space-y-3">
        {/* Botão de Sair com estilo sutil */}
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 bg-transparent text-slate-400 hover:bg-slate-800 hover:text-red-400 transition-colors"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4 text-red-500" />
          <span className="font-semibold">Sair da Conta</span>
        </Button>
        <div className="text-center text-xs text-slate-600">© 2024 Escola Music | v1.0</div>
      </div>
    </div>
  )
}