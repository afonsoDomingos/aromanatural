const mongoose = require('mongoose');

/**
 * Schema para itens de preços da lavandaria
 * Armazena informações sobre cada tipo de peça e seus respectivos preços
 */
const precoSchema = new mongoose.Schema(
    {
        item: {
            type: String,
            required: [true, 'Nome do item é obrigatório'],
            trim: true,
            unique: true,
            index: true,
        },
        preco1: {
            type: Number,
            required: [true, 'Preço 1 é obrigatório'],
            min: [0, 'Preço não pode ser negativo'],
        },
        preco2: {
            type: Number,
            default: null,
            min: [0, 'Preço não pode ser negativo'],
        },
        ativo: {
            type: Boolean,
            default: true,
            index: true,
        },
        categoria: {
            type: String,
            enum: ['roupa', 'acessorio', 'especial', 'outro'],
            default: 'roupa',
        },
        descricao: {
            type: String,
            trim: true,
        },
    },
    {
        timestamps: true, // Adiciona createdAt e updatedAt automaticamente
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

// Índice composto para busca eficiente
precoSchema.index({ item: 'text', descricao: 'text' });

// Virtual para nome formatado
precoSchema.virtual('itemFormatado').get(function () {
    return this.item.charAt(0).toUpperCase() + this.item.slice(1).toLowerCase();
});

// Método de instância para formatar preços
precoSchema.methods.formatarPrecos = function () {
    return {
        item: this.item,
        preco1: `${this.preco1} MT`,
        preco2: this.preco2 ? `${this.preco2} MT` : null,
    };
};

// Método estático para buscar itens ativos
precoSchema.statics.buscarAtivos = function () {
    return this.find({ ativo: true }).sort({ item: 1 });
};

const Preco = mongoose.model('Preco', precoSchema);

module.exports = Preco;
