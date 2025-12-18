# AromaNatural 🌿

**Limpeza Pura. Naturalmente.**

Website institucional completo para serviços de lavandaria ecológica premium à base de plantas, com painel administrativo para gestão de preços.

![AromaNatural](frontend/public/logo.svg)

## ✨ Características

✅ **Website Institucional Moderno** - Design premium com paleta ecológica  
✅ **Tabela de Preços Dinâmica** - Carregamento em tempo real via API  
✅ **Painel Administrativo** - CRUD completo de preços com autenticação JWT  
✅ **Formulário de Contato** - Integração com backend e validação  
✅ **Responsivo** - Adaptável para desktop, tablet e mobile  
✅ **SEO Otimizado** - Meta tags e estrutura semântica  
✅ **Design System** - Componentes reutilizáveis e tokens CSS  
✅ **Integração WhatsApp** - Botões diretos para contato  

## 🎯 Sobre o Projeto

A AromaNatural é uma empresa especializada em serviços de lavandaria ecológica, utilizando produtos naturais derivados de plantas. Este projeto é um website institucional profissional que:

- Apresenta os serviços e valores da marca
- Oferece tabela de preços dinâmica integrada ao banco de dados
- Permite gestão administrativa através de painel protegido
- Facilita o contato através de formulário e WhatsApp
- Transmite profissionalismo, confiança e sustentabilidade

## 🛠️ Stack Tecnológica

### Frontend
- **Framework**: Vue.js 3 (Composition API)
- **Roteamento**: Vue Router 4
- **HTTP Client**: Axios
- **Build Tool**: Vite
- **Estilo**: CSS Vanilla com Design System customizado
- **Fontes**: Google Fonts (Playfair Display + Open Sans)

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Banco de Dados**: MongoDB com Mongoose
- **Autenticação**: JWT (JSON Web Tokens)
- **Segurança**: bcrypt, helmet, cors, rate-limiting
- **Validação**: express-validator

## 🚀 Guia de Instalação Rápida

### Pré-requisitos
- Node.js v16+ instalado
- MongoDB instalado e rodando (ou conta MongoDB Atlas)

### 1. Clone o repositório
```bash
git clone <repository-url>
cd AromanaNatural
```

### 2. Configure o Backend
```bash
cd backend

# Já instalado! Caso precise reinstalar:
# npm install

# Configure as variáveis de ambiente
# Edite o arquivo backend/.env com suas configurações
# (Veja SETUP.md para detalhes)

# Popule o banco de dados com dados iniciais
npm run seed

# Inicie o servidor
npm run dev
```

✅ **Backend rodando em: http://localhost:5000**

### 3. Configure o Frontend
```bash
# Em outro terminal
cd frontend

# Já instalado! Caso precise reinstalar:
# npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

✅ **Frontend rodando em: http://localhost:5173**

## 🔐 Credenciais Padrão

Após executar `npm run seed`, use:

- **Email**: admin@aromanatural.com
- **Senha**: Admin@2025

⚠️ **Altere em produção!**

## 📁 Estrutura do Projeto

```
AromanaNatural/
├── backend/                 # API RESTful
│   ├── config/             # Configuração do MongoDB
│   ├── controllers/        # Lógica de negócio (preços, auth, contato)
│   ├── models/             # Schemas Mongoose (Preco, Admin, Contato)
│   ├── routes/             # Rotas da API
│   ├── middleware/         # Auth JWT e validação
│   ├── scripts/            # Script de seed do banco
│   └── server.js           # Servidor Express
│
├── frontend/               # Aplicação Vue.js
│   ├── public/             # Assets estáticos (logo.svg)
│   ├── src/
│   │   ├── assets/         # styles.css (Design System)
│   │   ├── components/     # Navbar, Footer
│   │   ├── views/          # Home, Servicos, Precos, Contato
│   │   │   └── admin/      # AdminLogin, AdminDashboard
│   │   ├── router/         # Vue Router com guards
│   │   ├── services/       # API client (axios)
│   │   ├── App.vue         # Componente raiz
│   │   └── main.js         # Entrada
│   └── index.html          # HTML com meta tags SEO
│
├── SETUP.md                # Guia detalhado de configuração
└── README.md               # Este arquivo
```

## 📊 Endpoints da API

### Públicos
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/precos` | Lista preços ativos |
| POST | `/api/contato` | Envia mensagem de contato |
| GET | `/api/health` | Health check da API |

### Protegidos (requer JWT)
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/api/auth/login` | Login admin |
| GET | `/api/precos/admin` | Lista todos os preços |
| POST | `/api/precos` | Cria novo preço |
| PUT | `/api/precos/:id` | Atualiza preço |
| DELETE | `/api/precos/:id` | Deleta preço |
| GET | `/api/contato` | Lista mensagens de contato |

## 🎨 Design System

### Paleta de Cores
```css
--cor-primaria: #4CAF50;        /* Verde Ecológico */
--cor-primaria-escura: #388E3C;
--cor-primaria-clara: #81C784;
--cor-bege: #F5F5DC;            /* Bege Natural */
--cor-branco: #FFFFFF;
--cor-terroso: #8B7355;
--cor-terroso-escuro: #6B5D52;
```

### Tipografia
- **Títulos**: Playfair Display (serif elegante)
- **Corpo**: Open Sans (sans-serif moderna)

### Componentes
- Navbar responsivo com menu hamburger
- Footer institucional completo
- Cards com hover effects
- Formulários com validação visual
- Modais para CRUD
- Tabelas responsivas com filtros

## 📱 Páginas do Website

### Públicas
1. **Home** (`/`) - Hero section, benefícios ecológicos, CTAs, depoimentos
2. **Serviços** (`/servicos`) - Catálogo de serviços com cards detalhados
3. **Preços** (`/precos`) - Tabela dinâmica com busca e filtros
4. **Contato** (`/contato`) - Formulário, informações, mapa, WhatsApp

### Administrativas
5. **Login Admin** (`/admin/login`) - Autenticação JWT
6. **Dashboard** (`/admin/dashboard`) - Gestão completa de preços

## 🔒 Segurança

- ✅ Senhas hasheadas com bcrypt
- ✅ Autenticação JWT
- ✅ Rate limiting em endpoints
- ✅ Helmet para headers de segurança
- ✅ CORS configurado
- ✅ Validação de inputs (express-validator)
- ✅ Guards de rota no frontend

## 📞 Informações de Contato

- **Telefones**: +258 87 637 8443 | +258 85 385 3747
- **Email**: contato@aromanatural.com
- **Endereço**: Mercado de Nkobe, Matola, Moçambique
- **WhatsApp**: Integrado no site

## 🚀 Deploy

Consulte o arquivo `SETUP.md` para instruções detalhadas de deploy em:
- Vercel/Netlify (Frontend)
- Render/Railway (Backend)
- MongoDB Atlas (Database)

## 📝 Comandos Úteis

### Backend
```bash
npm run dev    # Desenvolvimento com nodemon
npm start      # Produção
npm run seed   # Popular database
```

### Frontend
```bash
npm run dev      # Desenvolvimento
npm run build    # Build produção
npm run preview  # Preview do build
```

## 👨‍💻 Desenvolvedor

**Powered by Vibe**  
LinkedIn: [Afonso Domingos](https://www.linkedin.com/in/afonso-domingos-6b59361a5/)

Projeto desenvolvido com Vue.js, Node.js e MongoDB seguindo as melhores práticas de desenvolvimento web moderno.

---

© 2025 AromaNatural. Todos os direitos reservados.

**Limpeza Pura. Naturalmente. 🌿**
