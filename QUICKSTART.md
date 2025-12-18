# 🚀 Guia Rápido - AromaNatural

## ⚡ Início Rápido (3 passos)

### 1️⃣ Popular Banco de Dados
```powershell
cd backend
npm run seed
```

### 2️⃣ Iniciar Backend
```powershell
# No terminal 1
cd backend
npm run dev
```
✅ API: http://localhost:5000

### 3️⃣ Iniciar Frontend
```powershell
# No terminal 2
cd frontend
npm run dev
```
✅ Website: http://localhost:5173

---

## 🔐 Login Admin

Acesse: http://localhost:5173/admin

**Credenciais:**
- Email: `admin@aromanatural.com`
- Senha: `Admin@2025`

---

## 📋 Comandos Úteis

### Backend
```powershell
cd backend
npm run dev      # Desenvolvimento
npm start        # Produção
npm run seed     # Resetar banco de dados
```

### Frontend
```powershell
cd frontend
npm run dev      # Desenvolvimento
npm run build    # Build para produção
npm run preview  # Preview do build
```

---

## 🧪 Testar a API

### Health Check
```powershell
curl http://localhost:5000/api/health
```

### Listar Preços (Público)
```powershell
curl http://localhost:5000/api/precos
```

### Login Admin
```powershell
curl -X POST http://localhost:5000/api/auth/login `
  -H "Content-Type: application/json" `
  -d '{\"email\":\"admin@aromanatural.com\",\"senha\":\"Admin@2025\"}'
```

---

## 📁 Estrutura Simplificada

```
AromanaNatural/
├── backend/          → API (porta 5000)
│   ├── models/      → MongoDB Schemas
│   ├── controllers/ → Lógica de negócio
│   ├── routes/      → Endpoints
│   └── server.js    → Entrada
│
└── frontend/         → Website (porta 5173)
    ├── src/
    │   ├── views/   → Páginas
    │   ├── components/ → Navbar, Footer
    │   └── services/ → API client
    └── index.html
```

---

## 🐛 Resolução de Problemas

### MongoDB não está rodando
```powershell
# Iniciar MongoDB (Windows)
mongod

# Ou verificar se está rodando
mongo --version
```

### Porta já em uso
```powershell
# Backend (porta 5000)
# Edite backend/.env e mude PORT=5000 para PORT=5001

# Frontend (porta 5173)
# O Vite automaticamente usa outra porta se 5173 estiver ocupada
```

### Limpar e reinstalar
```powershell
# Backend
cd backend
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install

# Frontend
cd frontend
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
```

---

## 📞 URLs Rápidas

| Descrição | URL |
|-----------|-----|
| Website | http://localhost:5173 |
| API | http://localhost:5000 |
| Admin Login | http://localhost:5173/admin |
| Preços | http://localhost:5173/precos |
| Contato | http://localhost:5173/contato |
| API Health | http://localhost:5000/api/health |

---

## 🎯 Checklist de Início

- [ ] MongoDB instalado e rodando
- [ ] Dependências instaladas (`npm install`)
- [ ] Banco populado (`npm run seed`)
- [ ] Backend rodando (porta 5000)
- [ ] Frontend rodando (porta 5173)
- [ ] Login admin funcionando
- [ ] Preços sendo exibidos

---

## 📚 Documentação Completa

Para mais detalhes, consulte:
- `README.md` - Visão geral
- `SETUP.md` - Configuração detalhada
- `PROJETO_CONCLUIDO.md` - Resumo completo

---

**Limpeza Pura. Naturalmente. 🌿**
