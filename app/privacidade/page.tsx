import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Shield, Lock, Eye, Database, UserCheck } from "lucide-react"
import Link from "next/link"

export default function PrivacidadePage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <Link href="/login">
        <Button variant="ghost" className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>
      </Link>

      <Card className="p-8">
        <div className="mb-6 flex items-center gap-3">
          <Shield className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Política de Privacidade</h1>
        </div>

        <div className="mb-6 rounded-lg bg-primary/10 p-4">
          <p className="text-sm font-medium">
            Esta política está em conformidade com a LGPD (Lei Geral de Proteção de Dados - Lei nº 13.709/2018)
          </p>
        </div>

        <div className="space-y-6 text-sm leading-relaxed">
          <section>
            <h2 className="mb-3 text-xl font-semibold">1. Introdução</h2>
            <p className="text-muted-foreground">
              A Escolinha de Música está comprometida com a proteção da privacidade e dos dados pessoais de seus alunos,
              responsáveis e colaboradores. Esta política descreve como coletamos, usamos, armazenamos e protegemos suas
              informações pessoais.
            </p>
          </section>

          <section>
            <div className="mb-3 flex items-center gap-2">
              <Database className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">2. Dados Coletados</h2>
            </div>
            <p className="text-muted-foreground mb-2">Coletamos os seguintes tipos de dados pessoais:</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1">
              <li>
                <strong>Dados de Identificação:</strong> Nome completo, CPF, RG, data de nascimento
              </li>
              <li>
                <strong>Dados de Contato:</strong> Email, telefone, endereço
              </li>
              <li>
                <strong>Dados Acadêmicos:</strong> Instrumento, nível de experiência, histórico de aulas
              </li>
              <li>
                <strong>Dados Financeiros:</strong> Histórico de pagamentos, mensalidades
              </li>
              <li>
                <strong>Dados de Acesso:</strong> Login, senha (criptografada), logs de acesso
              </li>
            </ul>
          </section>

          <section>
            <div className="mb-3 flex items-center gap-2">
              <Eye className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">3. Finalidade do Tratamento</h2>
            </div>
            <p className="text-muted-foreground mb-2">Utilizamos seus dados pessoais para:</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1">
              <li>Gerenciar matrículas e cadastros de alunos</li>
              <li>Processar pagamentos e emitir recibos</li>
              <li>Comunicar informações sobre aulas, eventos e avisos</li>
              <li>Melhorar nossos serviços educacionais</li>
              <li>Cumprir obrigações legais e regulatórias</li>
              <li>Enviar lembretes de pagamento via WhatsApp (com consentimento)</li>
            </ul>
          </section>

          <section>
            <div className="mb-3 flex items-center gap-2">
              <Lock className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">4. Segurança dos Dados</h2>
            </div>
            <p className="text-muted-foreground mb-2">
              Implementamos medidas técnicas e organizacionais para proteger seus dados:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1">
              <li>Criptografia de senhas e dados sensíveis</li>
              <li>Controle de acesso baseado em permissões (admin/aluno)</li>
              <li>Backups regulares e seguros</li>
              <li>Monitoramento de acessos não autorizados</li>
              <li>Treinamento de equipe sobre proteção de dados</li>
              <li>Servidores seguros com certificados SSL/TLS</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">5. Compartilhamento de Dados</h2>
            <p className="text-muted-foreground">
              Não vendemos, alugamos ou compartilhamos seus dados pessoais com terceiros para fins comerciais. Seus
              dados podem ser compartilhados apenas:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1 mt-2">
              <li>Com prestadores de serviços essenciais (processamento de pagamentos, hospedagem)</li>
              <li>Quando exigido por lei ou ordem judicial</li>
              <li>Com seu consentimento explícito</li>
            </ul>
          </section>

          <section>
            <div className="mb-3 flex items-center gap-2">
              <UserCheck className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">6. Seus Direitos (LGPD)</h2>
            </div>
            <p className="text-muted-foreground mb-2">De acordo com a LGPD, você tem direito a:</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1">
              <li>
                <strong>Confirmação e Acesso:</strong> Saber se tratamos seus dados e acessá-los
              </li>
              <li>
                <strong>Correção:</strong> Solicitar correção de dados incompletos ou desatualizados
              </li>
              <li>
                <strong>Anonimização ou Exclusão:</strong> Solicitar anonimização ou exclusão de dados desnecessários
              </li>
              <li>
                <strong>Portabilidade:</strong> Solicitar transferência de dados para outro fornecedor
              </li>
              <li>
                <strong>Revogação de Consentimento:</strong> Retirar consentimento a qualquer momento
              </li>
              <li>
                <strong>Oposição:</strong> Opor-se ao tratamento de dados em certas situações
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">7. Retenção de Dados</h2>
            <p className="text-muted-foreground">
              Mantemos seus dados pessoais pelo tempo necessário para cumprir as finalidades descritas nesta política,
              ou conforme exigido por lei. Após o término da relação contratual, os dados podem ser mantidos por até 5
              anos para fins de auditoria e cumprimento de obrigações legais.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">8. Cookies e Tecnologias</h2>
            <p className="text-muted-foreground">
              Utilizamos cookies e tecnologias similares para melhorar sua experiência no sistema, manter sua sessão
              ativa e coletar informações sobre o uso do sistema. Você pode configurar seu navegador para recusar
              cookies, mas isso pode afetar algumas funcionalidades.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">9. Menores de Idade</h2>
            <p className="text-muted-foreground">
              Para alunos menores de 18 anos, o tratamento de dados pessoais é realizado com o consentimento dos pais ou
              responsáveis legais, conforme exigido pela LGPD.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">10. Alterações na Política</h2>
            <p className="text-muted-foreground">
              Esta política pode ser atualizada periodicamente. Notificaremos sobre mudanças significativas através do
              sistema ou por email. Recomendamos revisar esta página regularmente.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">11. Encarregado de Dados (DPO)</h2>
            <p className="text-muted-foreground">
              Para exercer seus direitos ou esclarecer dúvidas sobre o tratamento de dados pessoais, entre em contato
              com nosso Encarregado de Proteção de Dados:
            </p>
            <div className="mt-2 rounded-lg bg-muted p-4">
              <p className="text-sm">
                <strong>Email:</strong> dpo@escolinhademusica.com.br
              </p>
              <p className="text-sm">
                <strong>Telefone:</strong> (11) 1234-5678
              </p>
            </div>
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
