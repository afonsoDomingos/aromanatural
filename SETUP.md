# Guia de Configuração - AromaNatural

## 🚀 Como Executar o Projeto

### Pré-requisitos

- Node.js (v16 ou superior)
- MongoDB (local ou Atlas)
- npm ou yarn

### 1. Backend (API)

```bash
# Navegar para o diretório do backend
cd backend

# Instalar dependências
npm install

# Configurar variáveis de ambiente
# Copie o arquivo .env.example para .env
cp .env.example .env

# Edite o arquivo .env com suas configurações
# Principalmente a string de conexão do MongoDB (MONGODB_URI)

# Popular o banco de dados com dados iniciais
npm run seed

# Iniciar o servidor
npm run dev
```

A API estará disponível em: **http://localhost:5000**

#### Endpoints Principais:
- GET `/api/health` - Verificar status da API
- GET `/api/precos` - Listar preços (público)
- POST `/api/auth/login` - Login admin
- POST `/api/contato` - Enviar mensagem de contato

### 2. Frontend (Website)

```bash
# Em outro terminal, navegar para o diretório frontend
cd frontend

# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```

O website estará disponível em: **http://localhost:5173**

### 3. Credenciais Padrão do Admin

Após executar `npm run seed` no backend, use estas credenciais para fazer login:

- **Email**: admin@aromanatural.com
- **Senha**: Admin@2025

**⚠️ IMPORTANTE**: Altere estas credenciais em produção!

## 📦 Build para Produção

### Backend
```bash
cd backend
npm start
```

### Frontend
```bash
cd frontend
npm run build
```

Os arquivos estáticos serão gerados na pasta `dist/`.

## 🗄️ Banco de Dados

### MongoDB Local
Certifique-se de que o MongoDB está rodando localmente:
```bash
mongod
```

### MongoDB Atlas (Cloud)
1. Crie uma conta em https://www.mongodb.com/cloud/atlas
2. Crie um cluster gratuito
3. Obtenha a string de conexão
4. Atualize `MONGODB_URI` no `.env` do backend

Exemplo:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/aromanatural?retryWrites=true&w=majority
```

## 🌐 Deploy

### Opções Recomendadas:

#### Backend:
- **Render**: https://render.com
- **Railway**: https://railway.app
- **Heroku**: https://heroku.com
- **AWS EC2**: Para mais controle

#### Frontend:
- **Vercel**: https://vercel.com (recomendado para Vue)
- **Netlify**: https://netlify.com
- **GitHub Pages**: Apenas para sites estáticos

### Variáveis de Ambiente em Produção

Lembre-se de configurar as variáveis de ambiente no serviço de hospedagem:

**Backend:**
- `MONGODB_URI`
- `JWT_SECRET` (gerar uma chave segura)
- `NODE_ENV=production`
- `CORS_ORIGIN` (URL do frontend em produção)

**Frontend:**
- `VITE_API_URL` (URL da API em produção)

## 📝 Estrutura de Arquivos

```
AromanaNatural/
├── backend/              # API REST
│   ├── config/          # Configuração DB
│   ├── controllers/     # Lógica de negócio
│   ├── models/          # Schemas MongoDB
│   ├── routes/          # Rotas da API
│   ├── middleware/      # Auth, validação
│   ├── scripts/         # Seed database
│   └── server.js        # Entrada
│
├── frontend/            # Website Vue.js
│   ├── public/          # Assets estáticos
│   ├── src/
│   │   ├── assets/      # CSS, imagens
│   │   ├── components/  # Componentes reutilizáveis
│   │   ├── views/       # Páginas
│   │   ├── router/      # Vue Router
│   │   ├── services/    # API client
│   │   ├── App.vue      # Componente raiz
│   │   └── main.js      # Entrada
│   └── index.html
│
└── README.md
```

## 🛠️ Comandos Úteis

### Backend
- `npm run dev` - Desenvolvimento com nodemon
- `npm start` - Produção
- `npm run seed` - Popular database

### Frontend
- `npm run dev` - Desenvolvimento
- `npm run build` - Build produção
- `npm run preview` - Preview do build

## 🐛 Troubleshooting

### Erro: "Cannot connect to MongoDB"
- Verifique se o MongoDB está rodando
- Confirme a string de conexão no `.env`

### Erro: "CORS policy"
- Verifique `CORS_ORIGIN` no backend
- Certifique-se de que frontend e backend estão nas URLs corretas

### Erro: "Token inválido"
- Limpe o localStorage do navegador
- Faça login novamente

## 📞 Suporte

Para dúvidas ou problemas, entre em contato:
- **Email**: contato@aromanatural.com
- **Telefones**: +258 87 637 8443 | +258 85 385 3747

---

**Desenvolvido por Vibe**  
LinkedIn: [Afonso Domingos](https://www.linkedin.com/in/afonso-domingos-6b59361a5/)
