const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const validar = require('../middleware/validator');
const { proteger } = require('../middleware/auth');
const {
    obterPrecos,
    obterTodosPrecos,
    criarPreco,
    atualizarPreco,
    deletarPreco,
} = require('../controllers/precoController');

/**
 * @route   GET /api/precos
 * @desc    Obter preços ativos (público)
 * @access  Public
 */
router.get('/', obterPrecos);

/**
 * @route   GET /api/precos/admin
 * @desc    Obter todos os preços (admin)
 * @access  Private
 */
router.get('/admin', proteger, obterTodosPrecos);

/**
 * @route   POST /api/precos
 * @desc    Criar novo preço
 * @access  Private
 */
router.post(
    '/',
    proteger,
    [
        body('item')
            .notEmpty()
            .withMessage('Nome do item é obrigatório')
            .trim()
            .isLength({ min: 2, max: 100 })
            .withMessage('Item deve ter entre 2 e 100 caracteres'),
        body('preco1')
            .notEmpty()
            .withMessage('Preço 1 é obrigatório')
            .isFloat({ min: 0 })
            .withMessage('Preço 1 deve ser um número positivo'),
        body('preco2')
            .optional({ nullable: true })
            .isFloat({ min: 0 })
            .withMessage('Preço 2 deve ser um número positivo'),
        body('categoria')
            .optional()
            .isIn(['roupa', 'acessorio', 'especial', 'outro'])
            .withMessage('Categoria inválida'),
        validar,
    ],
    criarPreco
);

/**
 * @route   PUT /api/precos/:id
 * @desc    Atualizar preço
 * @access  Private
 */
router.put(
    '/:id',
    proteger,
    [
        body('item')
            .optional()
            .trim()
            .isLength({ min: 2, max: 100 })
            .withMessage('Item deve ter entre 2 e 100 caracteres'),
        body('preco1')
            .optional()
            .isFloat({ min: 0 })
            .withMessage('Preço 1 deve ser um número positivo'),
        body('preco2')
            .optional({ nullable: true })
            .isFloat({ min: 0 })
            .withMessage('Preço 2 deve ser um número positivo'),
        body('categoria')
            .optional()
            .isIn(['roupa', 'acessorio', 'especial', 'outro'])
            .withMessage('Categoria inválida'),
        body('ativo')
            .optional()
            .isBoolean()
            .withMessage('Ativo deve ser verdadeiro ou falso'),
        validar,
    ],
    atualizarPreco
);

/**
 * @route   DELETE /api/precos/:id
 * @desc    Deletar preço
 * @access  Private
 */
router.delete('/:id', proteger, deletarPreco);

module.exports = router;
