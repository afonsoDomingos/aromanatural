const { validationResult } = require('express-validator');

/**
 * Middleware para validar os resultados do express-validator
 * Se houver erros de validação, retorna status 400 com os erros
 */
const validar = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            sucesso: false,
            mensagem: 'Erros de validação',
            erros: errors.array().map((err) => ({
                campo: err.path || err.param,
                mensagem: err.msg,
            })),
        });
    }

    next();
};

module.exports = validar;
