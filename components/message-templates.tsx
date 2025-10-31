"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText } from "lucide-react"

interface MessageTemplate {
  id: string
  name: string
  message: string
}

const templates: MessageTemplate[] = [
  {
    id: "lembrete-gentil",
    name: "Lembrete Gentil",
    message: `Olá {nome}! 👋

Tudo bem? Aqui é da Escola de Música.

Notamos que o pagamento da sua mensalidade está pendente. Gostaríamos de lembrá-lo(a) que o valor de R$ {valor} está em aberto.

Para manter suas aulas em dia, por favor, realize o pagamento o quanto antes.

Qualquer dúvida, estamos à disposição!

Obrigado! 🎵`,
  },
  {
    id: "pagamento-atrasado",
    name: "Pagamento Atrasado",
    message: `Olá {nome},

Identificamos que sua mensalidade está em atraso há {meses} mês(es).

Valor total devido: R$ {total}

Para continuar aproveitando suas aulas de {instrumento}, pedimos que regularize sua situação o quanto antes.

Entre em contato conosco para combinarmos a melhor forma de pagamento.

Atenciosamente,
Escola de Música 🎸`,
  },
  {
    id: "cobranca-urgente",
    name: "Cobrança Urgente",
    message: `{nome}, precisamos falar com você!

Sua mensalidade está atrasada há {meses} meses e o valor total é de R$ {total}.

Infelizmente, sem a regularização do pagamento, não poderemos manter sua matrícula ativa.

Por favor, entre em contato urgentemente para resolvermos essa situação.

Escola de Música
{telefone}`,
  },
  {
    id: "personalizado",
    name: "Mensagem Personalizada",
    message: "",
  },
]

interface MessageTemplatesProps {
  onSelectTemplate: (message: string) => void
}

export function MessageTemplates({ onSelectTemplate }: MessageTemplatesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <FileText className="h-5 w-5" />
          Modelos de Mensagem
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {templates.map((template) => (
          <Button
            key={template.id}
            variant="outline"
            className="w-full justify-start bg-transparent"
            onClick={() => onSelectTemplate(template.message)}
          >
            {template.name}
          </Button>
        ))}
      </CardContent>
    </Card>
  )
}
