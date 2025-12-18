const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const validar = require('../middleware/validator');
const {
    login,
    obterPerfil,
    alterarSenha,
} = require('../controllers/authController');
const { proteger } = require('../middleware/auth');

/**
 * @route   POST /api/auth/login
 * @desc    Login do administrador
 * @access  Public
 */
router.post(
    '/login',
    [
        body('email')
            .isEmail()
            .withMessage('Por favor, insira um email válido')
            .normalizeEmail(),
        body('senha')
            .notEmpty()
            .withMessage('Senha é obrigatória')
            .isLength({ min: 6 })
            .withMessage('Senha deve ter no mínimo 6 caracteres'),
        validar,
    ],
    login
);

/**
 * @route   GET /api/auth/me
 * @desc    Obter perfil do admin autenticado
 * @access  Private
 */
router.get('/me', proteger, obterPerfil);

/**
 * @route   PUT /api/auth/senha
 * @desc    Alterar senha do admin
 * @access  Private
 */
router.put(
    '/senha',
    proteger,
    [
        body('senhaAtual').notEmpty().withMessage('Senha atual é obrigatória'),
        body('novaSenha')
            .isLength({ min: 6 })
            .withMessage('Nova senha deve ter no mínimo 6 caracteres'),
        validar,
    ],
    alterarSenha
);

module.exports = router;
