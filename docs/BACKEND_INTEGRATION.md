# Integração com Backend C#

Este documento descreve como integrar o frontend com o backend C# seguindo os princípios SOLID.

## Arquitetura

O frontend foi estruturado seguindo os princípios SOLID:

### 1. Single Responsibility Principle (SRP)
- Cada serviço tem uma única responsabilidade
- DTOs separados para cada domínio (Student, Payment, Auth, WhatsApp)
- Componentes UI separados da lógica de negócio

### 2. Open/Closed Principle (OCP)
- Serviços são abertos para extensão mas fechados para modificação
- Novas implementações podem ser adicionadas sem alterar código existente

### 3. Liskov Substitution Principle (LSP)
- Implementações Mock e HTTP são intercambiáveis
- Qualquer implementação de IStudentService pode substituir outra

### 4. Interface Segregation Principle (ISP)
- Interfaces específicas para cada domínio
- Clientes não dependem de métodos que não usam

### 5. Dependency Inversion Principle (DIP)
- Código depende de abstrações (interfaces), não de implementações concretas
- ServiceFactory gerencia a criação de instâncias
- Injeção de dependência via React Context

## Estrutura de Pastas

\`\`\`
├── api/
│   └── api-client.ts          # Cliente HTTP configurável
├── dtos/
│   ├── student.dto.ts         # DTOs de aluno
│   ├── payment.dto.ts         # DTOs de pagamento
│   ├── auth.dto.ts            # DTOs de autenticação
│   └── whatsapp.dto.ts        # DTOs de WhatsApp
├── services/
│   ├── interfaces/            # Contratos de serviço
│   │   ├── IStudentService.ts
│   │   ├── IPaymentService.ts
│   │   ├── IAuthService.ts
│   │   └── IWhatsAppService.ts
│   ├── implementations/       # Implementações
│   │   ├── MockStudentService.ts
│   │   ├── HttpStudentService.ts
│   │   ├── MockAuthService.ts
│   │   └── HttpAuthService.ts
│   └── ServiceFactory.ts      # Factory para criação de serviços
└── contexts/
    └── service-context.tsx    # Injeção de dependência
\`\`\`

## Configuração

### 1. Variáveis de Ambiente

Crie um arquivo `.env.local` baseado no `.env.local.example`:

\`\`\`env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_USE_MOCK_SERVICES=mock
\`\`\`

### 2. Alternar entre Mock e HTTP

Para usar dados mockados (desenvolvimento local):
\`\`\`env
NEXT_PUBLIC_USE_MOCK_SERVICES=mock
\`\`\`

Para usar o backend C# real:
\`\`\`env
NEXT_PUBLIC_USE_MOCK_SERVICES=http
NEXT_PUBLIC_API_URL=https://sua-api.com/api
\`\`\`

## Endpoints Esperados do Backend C#

### Autenticação
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `POST /api/auth/refresh` - Refresh token

### Alunos
- `GET /api/students` - Listar todos
- `GET /api/students/{id}` - Buscar por ID
- `POST /api/students` - Criar novo
- `PUT /api/students/{id}` - Atualizar
- `DELETE /api/students/{id}` - Deletar
- `GET /api/students/search?q={query}` - Buscar
- `GET /api/students/by-instrument/{instrument}` - Filtrar por instrumento
- `GET /api/students/by-payment-status/{status}` - Filtrar por status

### Pagamentos
- `GET /api/payments` - Listar todos
- `GET /api/payments/student/{studentId}` - Por aluno
- `POST /api/payments` - Criar pagamento
- `POST /api/payments/record` - Registrar pagamento
- `GET /api/payments/summary` - Resumo financeiro
- `GET /api/payments/overdue` - Pagamentos atrasados

### WhatsApp
- `POST /api/whatsapp/send` - Enviar mensagem
- `POST /api/whatsapp/send-bulk` - Enviar em massa
- `GET /api/whatsapp/templates` - Templates de mensagem

## Exemplo de Uso

### No Componente React

\`\`\`tsx
import { useStudentService } from '@/contexts/service-context'

export function MyComponent() {
  const studentService = useStudentService()
  
  async function loadStudents() {
    const students = await studentService.getAll()
    // ...
  }
  
  return <div>...</div>
}
\`\`\`

### Criar Nova Implementação

Para adicionar uma nova implementação (ex: GraphQL):

1. Crie a implementação:
\`\`\`typescript
// services/implementations/GraphQLStudentService.ts
export class GraphQLStudentService implements IStudentService {
  // Implementar métodos da interface
}
\`\`\`

2. Adicione ao ServiceFactory:
\`\`\`typescript
getStudentService(): IStudentService {
  if (this.mode === 'graphql') return new GraphQLStudentService()
  // ...
}
\`\`\`

## Autenticação

O sistema usa JWT tokens:
- Token armazenado em localStorage
- Automaticamente incluído em todas as requisições
- Refresh automático quando expira

## Tratamento de Erros

Todos os erros da API são capturados e formatados:

\`\`\`typescript
try {
  await studentService.create(data)
} catch (error: any) {
  console.error(error.message)
  // error.status - código HTTP
  // error.errors - erros de validação
}
\`\`\`

## Próximos Passos

1. Implementar backend C# com os endpoints especificados
2. Configurar CORS no backend
3. Implementar autenticação JWT
4. Testar integração alterando `NEXT_PUBLIC_USE_MOCK_SERVICES=http`
5. Implementar serviços de Payment e WhatsApp
