# Script para atualizar .env com MongoDB Atlas
$envContent = @"
# Variáveis de Ambiente - Backend AromaNatural

# Porta do Servidor
PORT=5000

# MongoDB Atlas Connection String
MONGODB_URI=mongodb+srv://karinganastudio23:VIbemongodb@cluster0.oe0akin.mongodb.net/aromanatural?retryWrites=true&w=majority

# JWT Secret
JWT_SECRET=aromanatural_super_secret_key_2025_change_in_production

# JWT Expiration
JWT_EXPIRES_IN=7d

# Admin Credentials (para seed inicial)
ADMIN_EMAIL=admin@aromanatural.com
ADMIN_PASSWORD=@Admin123@

# Environment
NODE_ENV=development

# CORS Origin
CORS_ORIGIN=http://localhost:5173
"@

$envContent | Out-File -FilePath ".env" -Encoding UTF8 -NoNewline
Write-Host "✅ Arquivo .env atualizado com MongoDB Atlas!" -ForegroundColor Green
