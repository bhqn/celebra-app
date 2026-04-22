# Celebra App

Celebra App é uma aplicação fullstack de evento e festas, com frontend em React + Vite e backend em Node.js + Express, usando MongoDB para persistência e Stripe para pagamentos.

## Estrutura do projeto

- `frontend/` - Aplicação React com Vite
- `backend/` - API RESTful em Node.js e Express
- `backend/routes/` - Rotas da API
- `backend/controllers/` - Lógica de negócio para usuários, pedidos e pagamentos
- `backend/models/` - Modelos Mongoose para usuários, produtos, pedidos e loja
- `backend/services/` - Integração com Stripe
- `frontend/src/` - Componentes React, contexto, serviços e estilos

## Principais funcionalidades

### Backend

- Autenticação de usuário com JWT
- Cadastro e login de usuários
- Gerenciamento de endereços do usuário
- Consulta de produtos disponíveis
- Criação e atualização de pedidos
- Adição e remoção de produtos em pedidos
- Checkout e integração com Stripe para gerar `paymentIntent`

### Frontend

- Páginas de login e registro
- Navegação entre catálogos de produtos (`drinks`, `food`, `entreterimento`, `estrutura`, `informacoes`)
- Carrinho e resumo de pedido
- Fluxo de checkout com pagamento
- Contextos para controle de passos e estados do pedido

## Instalação

### Backend

1. Acesse a pasta do backend:

```bash
cd backend
```

2. Instale as dependências:

```bash
npm install
```

3. Crie um arquivo `.env` com as variáveis necessárias:

```text
MONGO_URI=<sua-string-de-conexao-mongodb>
JWT_SECRET=<seu-segredo-jwt>
STRIPE_SECRET_KEY=<sua-chave-secreta-stripe>
PORT=5000
```

4. Rode a API em modo de desenvolvimento:

```bash
npm run dev
```

5. Para executar em produção:

```bash
npm start
```

### Frontend

1. Acesse a pasta do frontend:

```bash
cd frontend
```

2. Instale as dependências:

```bash
npm install
```

3. Execute a aplicação em modo de desenvolvimento:

```bash
npm run dev
```

4. Para gerar versão de produção:

```bash
npm run build
```

5. Para visualizar a build localmente:

```bash
npm run preview
```

## Variáveis de ambiente

### Backend

- `MONGO_URI` - string de conexão com o MongoDB
- `JWT_SECRET` - segredo usado para assinar tokens JWT
- `STRIPE_SECRET_KEY` - chave secreta da API Stripe
- `PORT` - porta opcional do servidor (padrão `5000`)

### Frontend

O frontend não exige variáveis de ambiente específicas no repositório, mas a aplicação se comunica com a API backend e espera o backend disponível em um endereço configurado no serviço de API.

## Rotas principais da API

### Autenticação

- `POST /auth/register` - Criar usuário
- `POST /auth/login` - Login de usuário

### Endereços

- `POST /auth/address` - Adicionar endereço (autenticado)
- `GET /auth/address` - Listar endereços do usuário
- `DELETE /auth/address/:addressId` - Remover endereço
- `PUT /auth/address/default/:addressId` - Definir endereço padrão

### Produtos

- `GET /products` - Listar produtos

### Pedidos

- `GET /order/current` - Obter pedido atual do usuário
- `POST /order` - Criar novo pedido
- `GET /order/:orderId` - Obter pedido por ID
- `POST /order/:orderId/product` - Adicionar produto ao pedido
- `PUT /order/:orderId/product/:productId` - Atualizar produto no pedido
- `DELETE /order/:orderId/product/:productId` - Remover produto do pedido
- `DELETE /order/:orderId/clear` - Limpar pedido
- `POST /order/:orderId/checkout` - Iniciar checkout
- `PATCH /order/:id/pay` - Marcar pedido como pago

### Pagamentos

- `POST /api/payment/create-payment-intent` - Criar Payment Intent Stripe

## Testes

No backend há suporte a testes com Jest e Supertest.

```bash
cd backend
npm test
```

## Observações

- O backend usa `celebrate` e `joi` para validação de entrada.
- O frontend usa `react-router-dom`, `react-hook-form`, `@stripe/react-stripe-js` e `axios`.
- A aplicação está organizada para suportar um fluxo completo de eventos/festas com catálogo, carrinho e pagamento.

