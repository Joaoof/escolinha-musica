import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function TermosPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <Link href="/login">
        <Button variant="ghost" className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>
      </Link>

      <Card className="p-8">
        <h1 className="mb-6 text-3xl font-bold">Termos de Uso</h1>

        <div className="space-y-6 text-sm leading-relaxed">
          <section>
            <h2 className="mb-3 text-xl font-semibold">1. Aceitação dos Termos</h2>
            <p className="text-muted-foreground">
              Ao acessar e utilizar o sistema de gerenciamento da Escolinha de Música, você concorda em cumprir e estar
              vinculado aos seguintes termos e condições de uso. Se você não concordar com qualquer parte destes termos,
              não deverá utilizar nosso sistema.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">2. Uso do Sistema</h2>
            <p className="text-muted-foreground mb-2">O sistema é destinado exclusivamente para:</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1">
              <li>Gerenciamento de matrículas e dados de alunos</li>
              <li>Controle de pagamentos e mensalidades</li>
              <li>Comunicação entre a escola e os alunos</li>
              <li>Administração de aulas e horários</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">3. Responsabilidades do Usuário</h2>
            <p className="text-muted-foreground mb-2">Você é responsável por:</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1">
              <li>Manter a confidencialidade de suas credenciais de acesso</li>
              <li>Fornecer informações verdadeiras e atualizadas</li>
              <li>Não compartilhar sua conta com terceiros</li>
              <li>Notificar imediatamente sobre qualquer uso não autorizado</li>
              <li>Utilizar o sistema de forma ética e legal</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">4. Propriedade Intelectual</h2>
            <p className="text-muted-foreground">
              Todo o conteúdo, design, código-fonte e funcionalidades do sistema são de propriedade exclusiva da
              Escolinha de Música e estão protegidos por leis de direitos autorais e propriedade intelectual. É proibida
              a reprodução, distribuição ou modificação sem autorização prévia.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">5. Pagamentos e Mensalidades</h2>
            <p className="text-muted-foreground">
              Os valores das mensalidades são definidos pela escola e podem ser alterados mediante aviso prévio de 30
              dias. O não pagamento dentro do prazo estabelecido pode resultar em suspensão temporária das aulas até a
              regularização.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">6. Cancelamento e Reembolso</h2>
            <p className="text-muted-foreground">
              O cancelamento da matrícula deve ser solicitado com antecedência mínima de 30 dias. Mensalidades já pagas
              não são reembolsáveis, exceto em casos específicos previstos em contrato.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">7. Limitação de Responsabilidade</h2>
            <p className="text-muted-foreground">
              A Escolinha de Música não se responsabiliza por danos indiretos, incidentais ou consequenciais resultantes
              do uso ou impossibilidade de uso do sistema, incluindo perda de dados ou interrupções de serviço.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">8. Modificações dos Termos</h2>
            <p className="text-muted-foreground">
              Reservamo-nos o direito de modificar estes termos a qualquer momento. As alterações entrarão em vigor
              imediatamente após sua publicação no sistema. O uso continuado do sistema após as modificações constitui
              aceitação dos novos termos.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">9. Lei Aplicável</h2>
            <p className="text-muted-foreground">
              Estes termos são regidos pelas leis da República Federativa do Brasil. Qualquer disputa será resolvida no
              foro da comarca da sede da escola.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">10. Contato</h2>
            <p className="text-muted-foreground">
              Para dúvidas sobre estes termos, entre em contato através do email: contato@escolinhademusica.com.br
            </p>
          </section>

          <div className="mt-8 border-t pt-6">
            <p className="text-xs text-muted-foreground">
              Última atualização: {new Date().toLocaleDateString("pt-BR")}
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
