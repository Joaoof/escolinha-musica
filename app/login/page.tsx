"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, Lock, Music } from "lucide-react"
import { Open_Sans } from "next/font/google"

const openSans = Open_Sans({ subsets: ["latin"] })

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)
    try {
      const success = await login(email, password)
      if (success) {
        router.push("/")
      } else {
        setError("Email ou senha incorretos")
      }
    } catch {
      setError("Erro ao fazer login. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  // Apenas 2 opções rápidas fixas: admin e aluno
  const quickAccess = [
    { label: "Admin", email: "admin@escola.com", password: "admin123" },
    { label: "Aluno", email: "aluno@escola.com", password: "aluno123" },
  ]

  const handleQuickLogin = (email: string, password: string) => {
    setEmail(email)
    setPassword(password)
    setError("")
  }

  return (
    <div className={`flex min-h-screen bg-slate-50 ${openSans.className}`}>
      {/* Painel Esquerdo - Azul Escuro */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 flex-col items-center justify-center p-8 rounded-r-3xl shadow-2xl relative overflow-hidden">
        {/* Elementos decorativos */}
        <div className="absolute top-10 right-10 text-slate-700 opacity-20">
          <Music className="h-24 w-24" />
        </div>
        <div className="absolute bottom-10 left-10 text-slate-700 opacity-20">
          <Music className="h-20 w-20" />
        </div>

        <div className="relative z-10 text-center">
          <div className="mb-6 flex justify-center">
            <img src={"https://cdn-icons-png.flaticon.com/512/5802/5802341.png"} className="h-16 w-16 text-amber-400" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Bem-vindo de Volta!
          </h1>
          <p className="text-slate-300 text-center text-lg max-w-sm mb-8">
            Acesse sua conta e continue sua jornada musical conosco
          </p>
          <div className="border-2 border-amber-400 rounded-full px-8 py-3 inline-block">
            <p className="text-amber-400 font-bold text-lg">Escolinha de Música</p>
          </div>
        </div>
      </div>

      {/* Painel Direito - Formulário */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          <div className="mb-8 flex justify-center lg:hidden">
            <Music className="h-10 w-10 text-slate-800" />
          </div>

          <h2 className="text-3xl font-bold text-slate-800 mb-2 text-center">
            Entrar
          </h2>
          <p className="text-slate-600 text-center mb-8">
            Faça login com suas credenciais de acesso
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Campo Email */}
            <div className="relative">
              <Mail className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                required
                className="pl-12 bg-slate-100 border-0 rounded-lg h-11 text-slate-800 placeholder:text-slate-500 focus:ring-2 focus:ring-slate-800 focus:bg-white transition"
              />
            </div>

            {/* Campo Senha */}
            <div className="relative">
              <Lock className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
              <Input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                required
                className="pl-12 bg-slate-100 border-0 rounded-lg h-11 text-slate-800 placeholder:text-slate-500 focus:ring-2 focus:ring-slate-800 focus:bg-white transition"
              />
            </div>

            {/* Mensagem de Erro */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg text-center">
                {error}
              </div>
            )}

            {/* Botão Entrar */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-slate-800 hover:bg-slate-900 text-white font-semibold h-11 rounded-full mt-6 transition duration-300 transform hover:shadow-lg"
            >
              {isLoading ? "Entrando..." : "ENTRAR"}
            </Button>
          </form>
          {/* Footer */}
          <p className="text-center text-xs text-slate-500 mt-8">
            © {new Date().getFullYear()} Escolinha de Música
          </p>
        </div>
      </div>
    </div >
  )
}