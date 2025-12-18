require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/database');

// Importar rotas
const authRoutes = require('./routes/authRoutes');
const precoRoutes = require('./routes/precoRoutes');
const contatoRoutes = require('./routes/contatoRoutes');

// Inicializar Express
const app = express();

// Conectar ao MongoDB
connectDB();

// Middlewares de Segurança
app.use(helmet()); // Headers de segurança
app.use(
    cors({
        origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
        credentials: true,
    })
);

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // Limite de 100 requisições por IP
    message: 'Muitas requisições deste IP, por favor tente novamente mais tarde.',
});
app.use('/api/', limiter);

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging simples
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} - ${new Date().toISOString()}`);
    next();
});

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/precos', precoRoutes);
app.use('/api/contato', contatoRoutes);

// Rota de health check
app.get('/api/health', (req, res) => {
    res.status(200).json({
        sucesso: true,
        mensagem: 'API AromaNatural funcionando perfeitamente! 🌿',
        timestamp: new Date().toISOString(),
    });
});

// Rota inicial
app.get('/', (req, res) => {
    res.json({
        mensagem: 'API AromaNatural - Lavandaria Ecológica 🌿',
        versao: '1.0.0',
        endpoints: {
            auth: '/api/auth',
            precos: '/api/precos',
            contato: '/api/contato',
            health: '/api/health',
        },
    });
});

// Tratamento de rotas não encontradas
app.use((req, res) => {
    res.status(404).json({
        sucesso: false,
        mensagem: 'Rota não encontrada',
    });
});

// Middleware de tratamento de erros global
app.use((err, req, res, next) => {
    console.error('Erro capturado:', err.stack);

    res.status(err.status || 500).json({
        sucesso: false,
        mensagem: err.message || 'Erro interno do servidor',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
});

// Porta
const PORT = process.env.PORT || 5000;

// Iniciar servidor
const server = app.listen(PORT, () => {
    console.log('\n🚀 ====================================');
    console.log(`   Servidor rodando em modo ${process.env.NODE_ENV || 'development'}`);
    console.log(`   🌐 URL: http://localhost:${PORT}`);
    console.log(`   📡 API Health: http://localhost:${PORT}/api/health`);
    console.log('🚀 ====================================\n');
});

// Tratamento de erros não capturados
process.on('unhandledRejection', (err) => {
    console.error('❌ Erro não tratado:', err);
    server.close(() => process.exit(1));
});

module.exports = app;
