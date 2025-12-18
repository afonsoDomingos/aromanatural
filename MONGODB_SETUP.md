# ⚠️ MongoDB Não Detectado

## Problema
O MongoDB não está instalado ou não está no PATH do sistema.

## 🔧 Soluções

### Opção 1: Usar MongoDB Atlas (Cloud - Recomendado) ✅

**Vantagens:**
- ✅ Gratuito (tier free)
- ✅ Sem instalação local
- ✅ Sempre disponível
- ✅ Fácil de configurar

**Passos:**

1. **Criar conta no MongoDB Atlas**
   - Acesse: https://www.mongodb.com/cloud/atlas/register
   - Crie uma conta gratuita

2. **Criar um Cluster Gratuito**
   - Escolha "Free Shared" (M0)
   - Selecione a região mais próxima
   - Clique em "Create Cluster"

3. **Configurar Acesso**
   - Vá em "Database Access" → "Add New Database User"
   - Username: `aromanatural`
   - Password: `AromaNatural2025` (ou escolha outra)
   - Role: "Atlas admin"

4. **Configurar IP Whitelist**
   - Vá em "Network Access" → "Add IP Address"
   - Clique em "Allow Access from Anywhere" (0.0.0.0/0)
   - Confirme

5. **Obter String de Conexão**
   - Vá em "Database" → "Connect" → "Connect your application"
   - Copie a string de conexão
   - Exemplo: `mongodb+srv://aromanatural:<password>@cluster0.xxxxx.mongodb.net/aromanatural?retryWrites=true&w=majority`

6. **Configurar no Projeto**
   - Abra: `backend/.env`
   - Substitua `MONGODB_URI` pela string copiada
   - **IMPORTANTE:** Substitua `<password>` pela senha que você criou no passo 3

   Exemplo:
   ```
   MONGODB_URI=mongodb+srv://aromanatural:AromaNatural2025@cluster0.xxxxx.mongodb.net/aromanatural?retryWrites=true&w=majority
   ```

7. **Salve o arquivo e rode novamente:**
   ```powershell
   cd backend
   npm run seed
   ```

---

### Opção 2: Instalar MongoDB Localmente

**Para Windows:**

1. **Download**
   - Acesse: https://www.mongodb.com/try/download/community
   - Baixe a versão Community para Windows
   - Execute o instalador (.msi)

2. **Instalação**
   - Escolha "Complete" installation
   - Marque "Install MongoDB as a Service"
   - Use as configurações padrão

3. **Verificar Instalação**
   ```powershell
   mongod --version
   ```

4. **Iniciar MongoDB Service**
   ```powershell
   net start MongoDB
   ```

5. **Configurar Projeto**
   - Mantenha o `.env` com:
   ```
   MONGODB_URI=mongodb://localhost:27017/aromanatural
   ```

6. **Popular o Banco**
   ```powershell
   cd backend
   npm run seed
   ```

---

## 🎯 Qual Escolher?

| Aspecto | MongoDB Atlas (Cloud) | MongoDB Local |
|---------|----------------------|---------------|
| Instalação | ✅ Não precisa | ❌ Download ~500MB |
| Configuração | ✅ Simples | ⚠️ Moderada |
| Internet | ⚠️ Precisa | ✅ Funciona offline |
| Manutenção | ✅ Zero | ⚠️ Manual |
| Gratuito | ✅ Sim (até 512MB) | ✅ Sim (ilimitado) |
| Deploy | ✅ Já pronto | ⚠️ Precisa migrar |

**Recomendação:** Use **MongoDB Atlas** para começar rapidamente!

---

## 📝 Próximos Passos Após Configurar MongoDB

1. Popular o banco de dados:
   ```powershell
   cd backend
   npm run seed
   ```

2. Iniciar backend:
   ```powershell
   npm run dev
   ```

3. Em outro terminal, iniciar frontend:
   ```powershell
   cd frontend
   npm run dev
   ```

---

## 🆘 Precisa de Ajuda?

Se tiver problemas:
1. Verifique se copiou a string de conexão corretamente
2. Confirme que substituiu `<password>` pela senha real
3. Certifique-se de que o IP foi liberado no Atlas
4. Teste a conexão com MongoDB Compass (GUI)

---

**Escolha uma opção acima e me avise quando estiver pronto para continuar!** 🚀
