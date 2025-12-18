const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const validar = require('../middleware/validator');
const { proteger } = require('../middleware/auth');
const {
    criarContato,
    obterContatos,
    marcarComoLido,
    deletarContato,
} = require('../controllers/contatoController');

/**
 * @route   POST /api/contato
 * @desc    Criar nova mensagem de contato
 * @access  Public
 */
router.post(
    '/',
    [
        body('nome')
            .notEmpty()
            .withMessage('Nome é obrigatório')
            .trim()
            .isLength({ min: 2, max: 100 })
            .withMessage('Nome deve ter entre 2 e 100 caracteres'),
        body('email')
            .notEmpty()
            .withMessage('Email é obrigatório')
            .isEmail()
            .withMessage('Por favor, insira um email válido')
            .normalizeEmail(),
        body('telefone')
            .optional()
            .trim(),
        body('mensagem')
            .notEmpty()
            .withMessage('Mensagem é obrigatória')
            .trim()
            .isLength({ min: 10, max: 1000 })
            .withMessage('Mensagem deve ter entre 10 e 1000 caracteres'),
        validar,
    ],
    criarContato
);

/**
 * @route   GET /api/contato
 * @desc    Obter todas as mensagens
 * @access  Private
 */
router.get('/', proteger, obterContatos);

/**
 * @route   PUT /api/contato/:id/lido
 * @desc    Marcar como lido
 * @access  Private
 */
router.put('/:id/lido', proteger, marcarComoLido);

/**
 * @route   DELETE /api/contato/:id
 * @desc    Deletar mensagem
 * @access  Private
 */
router.delete('/:id', proteger, deletarContato);

module.exports = router;
