import Link from "next/link"
import { Music } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            <Music className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium">Escolinha de Música</span>
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <Link href="/termos" className="hover:text-foreground transition-colors">
              Termos de Uso
            </Link>
            <Link href="/privacidade" className="hover:text-foreground transition-colors">
              Política de Privacidade
            </Link>
            <Link href="/seguranca" className="hover:text-foreground transition-colors">
              Segurança
            </Link>
          </div>

          <div className="text-sm text-muted-foreground">
            © {currentYear} Escolinha de Música. Todos os direitos reservados.
          </div>
        </div>

        <div className="mt-4 text-xs text-muted-foreground">
          <p>
            Este sistema está em conformidade com a LGPD (Lei Geral de Proteção de Dados - Lei nº 13.709/2018). Seus
            dados são tratados com segurança e privacidade.
          </p>
        </div>
      </div>
    </footer>
  )
}
