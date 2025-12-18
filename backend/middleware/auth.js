const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

/**
 * Middleware para proteger rotas que requerem autenticação
 * Verifica se o token JWT é válido e anexa o usuário à requisição
 */
const proteger = async (req, res, next) => {
    let token;

    // Verifica se o token está presente no header Authorization
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // Extrai o token do header
            token = req.headers.authorization.split(' ')[1];

            // Verifica e decodifica o token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Busca o admin no banco e anexa à requisição (sem a senha)
            req.admin = await Admin.findById(decoded.id).select('-senha');

            if (!req.admin) {
                return res.status(401).json({
                    sucesso: false,
                    mensagem: 'Usuário não encontrado',
                });
            }

            if (!req.admin.ativo) {
                return res.status(401).json({
                    sucesso: false,
                    mensagem: 'Usuário inativo',
                });
            }

            next();
        } catch (error) {
            console.error('Erro na autenticação:', error);
            return res.status(401).json({
                sucesso: false,
                mensagem: 'Token inválido ou expirado',
            });
        }
    }

    if (!token) {
        return res.status(401).json({
            sucesso: false,
            mensagem: 'Acesso negado. Token não fornecido',
        });
    }
};

/**
 * Middleware para verificar role de superadmin
 */
const verificarSuperAdmin = (req, res, next) => {
    if (req.admin && req.admin.role === 'superadmin') {
        next();
    } else {
        res.status(403).json({
            sucesso: false,
            mensagem: 'Acesso negado. Apenas superadmins podem realizar esta ação',
        });
    }
};

/**
 * Gera um token JWT para o usuário
 */
const gerarToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    });
};

module.exports = {
    proteger,
    verificarSuperAdmin,
    gerarToken,
};
