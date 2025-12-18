const mongoose = require('mongoose');

/**
 * Schema para mensagens de contato do website
 */
const contatoSchema = new mongoose.Schema(
    {
        nome: {
            type: String,
            required: [true, 'Nome é obrigatório'],
            trim: true,
            maxlength: [100, 'Nome não pode exceder 100 caracteres'],
        },
        email: {
            type: String,
            required: [true, 'Email é obrigatório'],
            lowercase: true,
            trim: true,
            match: [
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                'Por favor, insira um email válido',
            ],
        },
        telefone: {
            type: String,
            trim: true,
        },
        mensagem: {
            type: String,
            required: [true, 'Mensagem é obrigatória'],
            trim: true,
            maxlength: [1000, 'Mensagem não pode exceder 1000 caracteres'],
        },
        lido: {
            type: Boolean,
            default: false,
        },
        respondido: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

// Índices para busca eficiente
contatoSchema.index({ lido: 1, createdAt: -1 });
contatoSchema.index({ email: 1 });

// Método estático para buscar não lidas
contatoSchema.statics.buscarNaoLidas = function () {
    return this.find({ lido: false }).sort({ createdAt: -1 });
};

const Contato = mongoose.model('Contato', contatoSchema);

module.exports = Contato;
