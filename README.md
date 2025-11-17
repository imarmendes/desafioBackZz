# Zazuu Desafio - Backend API

API RESTful desenvolvida em Node.js + TypeScript + Express + Prisma + PostgreSQL para gerenciamento de produtos com autenticação JWT.

## 🚀 Tecnologias

- **Node.js** v18+ / v20+
- **TypeScript** 5.x
- **Express** 5.x
- **Prisma** 6.x (ORM)
- **PostgreSQL** (banco de dados)
- **JWT** (autenticação)
- **bcryptjs** (hash de senhas)
- **Swagger/OpenAPI** (documentação)
- **ts-node** + **nodemon** (desenvolvimento)

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) (v18 ou superior)
- [PostgreSQL](https://www.postgresql.org/) (v12 ou superior)
- [Git](https://git-scm.com/)

## ⚙️ Instalação

### 1. Clone o repositório

``bash
git clone https://github.com/imarmendes/desafioBackZz.git
cd desafioBackZz
``

### 2. Instale as dependências

``bash
npm install
``

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

``env
# Database
DATABASE_URL="postgresql://usuario:senha@localhost:5432/zazuu_desafio?schema=public"

# Server
PORT=3000
``

**⚠️ Importante:** Substitua `usuario` e `senha` pelas credenciais do seu PostgreSQL.

### 4. Configure o banco de dados

Crie o banco de dados no PostgreSQL:

``bash
# Via psql
psql -U postgres
CREATE DATABASE zazuu_desafio;
\q
``

Execute as migrações do Prisma:

``bash
npx prisma migrate dev --name init
``

Gere o Prisma Client:

``bash
npx prisma generate
``

## 🎯 Executando o projeto

### Modo desenvolvimento (com hot-reload)

``bash
npm run dev
``

O servidor iniciará em `http://localhost:3000`

### Build para produção

``bash
npm run build
npm start
``

## 📚 Documentação da API

Acesse a documentação interativa do Swagger:

**URL:** `http://localhost:3000/api/docs`

## 🔐 Autenticação

A API utiliza **JWT (JSON Web Token)** para autenticação. 

### Fluxo de autenticação:

1. **Registrar usuário:** `POST /api/auth/register`
2. **Login:** `POST /api/auth/login` → retorna `{ token, id, name, email }`
3. **Usar o token:** Adicione o header em todas as rotas protegidas:
   ``
   Authorization: Bearer SEU_TOKEN_AQUI
   ``

## 🛣️ Endpoints

### Auth

| Método | Rota | Descrição | Autenticação |
|--------|------|-----------|--------------|
| POST | `/api/auth/register` | Registra novo usuário | ❌ |
| POST | `/api/auth/login` | Faz login e retorna token | ❌ |

### Products (requer autenticação)

| Método | Rota | Descrição | Autenticação |
|--------|------|-----------|--------------|
| GET | `/api/products` | Lista produtos do usuário | ✅ |
| GET | `/api/products/:id` | Busca produto por ID | ✅ |
| POST | `/api/products` | Cria novo produto | ✅ |
| PUT | `/api/products/:id` | Atualiza produto | ✅ |
| DELETE | `/api/products/:id` | Remove produto | ✅ |

## 📦 Exemplo de uso

### 1. Registrar usuário

``bash
POST http://localhost:3000/api/auth/register
Content-Type: application/json

{
  "name": "João Silva",
  "email": "joao@example.com",
  "password": "senha123"
}
``

### 2. Fazer login

``bash
POST http://localhost:3000/api/auth/login
Content-Type: application/json

{
  "email": "joao@example.com",
  "password": "senha123"
}
``

**Resposta:**
``json
{
  "id": "uuid-aqui",
  "name": "João Silva",
  "email": "joao@example.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
``

### 3. Criar produto (use o token retornado)

``bash
POST http://localhost:3000/api/products
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "name": "Notebook Dell",
  "price": 3500.00,
  "description": "Notebook i7, 16GB RAM"
}
``

### 4. Listar produtos

``bash
GET http://localhost:3000/api/products
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
``

## 🗂️ Estrutura do projeto

```plaintext
desafioBackZz/
├── prisma/
│   ├── schema.prisma         # Schema do banco de dados
│   └── migrations/           # Migrações
├── src/
│   ├── api/
│   │   ├── controllers/      # Controllers (AuthController, ProductController)
│   │   ├── services/         # Lógica de negócio (authService, productService)
│   │   ├── routes/           # Rotas (authRoutes, productRoutes)
│   │   ├── middlewares/      # Middlewares (authMiddleware, errorHandler)
│   │   └── utils/            # Utilitários (jwt, password)
│   ├── docs/
│   │   └── swagger.ts        # Configuração do Swagger
│   ├── prisma/
│   │   └── client.ts         # Cliente Prisma
│   ├── generated/            # Código gerado pelo Prisma
│   ├── app.ts                # Configuração do Express
│   └── server.ts             # Entry point
├── .env                      # Variáveis de ambiente
├── package.json              # Dependências
├── tsconfig.json             # Configuração TypeScript
└── README.md                 # Este arquivo
```

## 🗄️ Modelo de dados

### User

```typescript
{
  id: string;          // UUID
  name: string;
  email: string;       // unique
  password: string;    // hashed
  products: Product[];
  createdAt: DateTime;
  updatedAt: DateTime;
}
```

### Product

```typescript
{
  id: string;          // UUID
  name: string;
  price: number;
  description?: string; // opcional
  userId: string;
  user: User;
  createdAt: DateTime;
  updatedAt: DateTime;
}
```

## 🔧 Scripts disponíveis

``bash
# Desenvolvimento (com hot-reload)
npm run dev

# Build para produção
npm run build

# Executar produção
npm start

# Prisma
npx prisma migrate dev          # Criar nova migração
npx prisma generate             # Gerar Prisma Client
npx prisma studio               # Abrir interface visual do banco
npx prisma db push              # Aplicar schema sem migração
``

## 🐛 Troubleshooting

### Erro: "Cannot find module '@prisma/client'"
``bash
npx prisma generate
``

### Erro: "connect ECONNREFUSED" (PostgreSQL)
- Verifique se o PostgreSQL está rodando
- Confira as credenciais no `.env`
- Teste a conexão: `psql -U postgres -h localhost`

### Erro: "Port 3000 is already in use"
- Mude a porta no `.env`: `PORT=3001`
- Ou mate o processo: `npx kill-port 3000`

### Swagger não mostra endpoints
- Pare o servidor (Ctrl+C)
- Rode: `npm run dev`
- Acesse: `http://localhost:3000/api/docs`

## 📝 Observações

- Senhas são hasheadas com **bcrypt** (10 rounds)
- Tokens JWT **não expiram** (adicione expiração em produção)
- CORS está **habilitado para todas as origens** (ajuste em produção)
- O campo `description` em `Product` é **opcional**
- Todos os IDs são **UUID v4**

## 📄 Licença

ISC

## 👤 Autor

**Imar Mendes**

- GitHub: [@imarmendes](https://github.com/imarmendes)
- Repositório: [desafioBackZz](https://github.com/imarmendes/desafioBackZz)

---

⭐ Se este projeto foi útil, deixe uma estrela no GitHub!
