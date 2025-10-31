import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Shield, Lock, Key, AlertTriangle, CheckCircle2 } from "lucide-react"
import Link from "next/link"

export default function SegurancaPage() {
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
          <h1 className="text-3xl font-bold">Segurança da Informação</h1>
        </div>

        <div className="mb-6 rounded-lg bg-green-500/10 border border-green-500/20 p-4">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-green-900 dark:text-green-100">Sistema Seguro e Protegido</p>
              <p className="text-xs text-green-800 dark:text-green-200 mt-1">
                Utilizamos as melhores práticas de segurança para proteger seus dados
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6 text-sm leading-relaxed">
          <section>
            <h2 className="mb-3 text-xl font-semibold">Nosso Compromisso com a Segurança</h2>
            <p className="text-muted-foreground">
              A segurança dos dados de nossos alunos e colaboradores é nossa prioridade máxima. Implementamos múltiplas
              camadas de proteção para garantir que suas informações estejam sempre seguras e protegidas contra acessos
              não autorizados.
            </p>
          </section>

          <section>
            <div className="mb-3 flex items-center gap-2">
              <Lock className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">Medidas de Segurança Implementadas</h2>
            </div>

            <div className="space-y-4">
              <div className="rounded-lg border p-4">
                <h3 className="font-semibold mb-2">Criptografia de Dados</h3>
                <p className="text-muted-foreground text-sm">
                  Todas as senhas são criptografadas usando algoritmos de hash seguros (bcrypt). Dados sensíveis são
                  transmitidos através de conexões HTTPS com certificados SSL/TLS.
                </p>
              </div>

              <div className="rounded-lg border p-4">
                <h3 className="font-semibold mb-2">Controle de Acesso</h3>
                <p className="text-muted-foreground text-sm">
                  Sistema de permissões baseado em funções (RBAC) que garante que cada usuário tenha acesso apenas às
                  informações necessárias para suas atividades. Administradores e alunos têm níveis de acesso
                  diferentes.
                </p>
              </div>

              <div className="rounded-lg border p-4">
                <h3 className="font-semibold mb-2">Autenticação Segura</h3>
                <p className="text-muted-foreground text-sm">
                  Sistema de login com validação de credenciais, sessões seguras e logout automático após período de
                  inatividade. Proteção contra ataques de força bruta.
                </p>
              </div>

              <div className="rounded-lg border p-4">
                <h3 className="font-semibold mb-2">Backup e Recuperação</h3>
                <p className="text-muted-foreground text-sm">
                  Backups automáticos diários dos dados com armazenamento seguro e criptografado. Plano de recuperação
                  de desastres para garantir continuidade do serviço.
                </p>
              </div>

              <div className="rounded-lg border p-4">
                <h3 className="font-semibold mb-2">Monitoramento Contínuo</h3>
                <p className="text-muted-foreground text-sm">
                  Logs de acesso e atividades são monitorados continuamente para detectar comportamentos suspeitos ou
                  tentativas de acesso não autorizado.
                </p>
              </div>

              <div className="rounded-lg border p-4">
                <h3 className="font-semibold mb-2">Atualizações de Segurança</h3>
                <p className="text-muted-foreground text-sm">
                  Sistema e dependências são atualizados regularmente para corrigir vulnerabilidades de segurança
                  conhecidas.
                </p>
              </div>
            </div>
          </section>

          <section>
            <div className="mb-3 flex items-center gap-2">
              <Key className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">Boas Práticas para Usuários</h2>
            </div>
            <p className="text-muted-foreground mb-3">
              Você também pode contribuir para a segurança do sistema seguindo estas recomendações:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>
                <strong>Senha Forte:</strong> Use senhas com pelo menos 8 caracteres, incluindo letras maiúsculas,
                minúsculas, números e símbolos
              </li>
              <li>
                <strong>Não Compartilhe:</strong> Nunca compartilhe sua senha ou credenciais de acesso com outras
                pessoas
              </li>
              <li>
                <strong>Logout:</strong> Sempre faça logout ao terminar de usar o sistema, especialmente em computadores
                compartilhados
              </li>
              <li>
                <strong>Dispositivos Seguros:</strong> Acesse o sistema apenas de dispositivos confiáveis e com
                antivírus atualizado
              </li>
              <li>
                <strong>Atualize Regularmente:</strong> Mantenha seu navegador e sistema operacional atualizados
              </li>
              <li>
                <strong>Desconfie de Phishing:</strong> Nunca clique em links suspeitos ou forneça suas credenciais em
                sites não oficiais
              </li>
            </ul>
          </section>

          <section>
            <div className="mb-3 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-600" />
              <h2 className="text-xl font-semibold">Reporte Incidentes de Segurança</h2>
            </div>
            <p className="text-muted-foreground mb-3">
              Se você suspeitar de qualquer atividade não autorizada em sua conta ou identificar uma vulnerabilidade de
              segurança, entre em contato imediatamente:
            </p>
            <div className="rounded-lg bg-amber-500/10 border border-amber-500/20 p-4">
              <p className="text-sm">
                <strong>Email de Segurança:</strong> seguranca@escolinhademusica.com.br
              </p>
              <p className="text-sm">
                <strong>Telefone de Emergência:</strong> (11) 1234-5678
              </p>
              <p className="text-xs text-muted-foreground mt-2">Responderemos em até 24 horas úteis</p>
            </div>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">Certificações e Conformidade</h2>
            <p className="text-muted-foreground mb-3">Nosso sistema está em conformidade com:</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1">
              <li>LGPD (Lei Geral de Proteção de Dados - Lei nº 13.709/2018)</li>
              <li>Boas práticas de segurança OWASP (Open Web Application Security Project)</li>
              <li>Padrões de criptografia modernos e seguros</li>
              <li>Princípios de Privacy by Design</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">Auditorias e Testes</h2>
            <p className="text-muted-foreground">
              Realizamos auditorias de segurança periódicas e testes de penetração para identificar e corrigir possíveis
              vulnerabilidades antes que possam ser exploradas. Nossa equipe de TI está constantemente monitorando e
              melhorando a segurança do sistema.
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
