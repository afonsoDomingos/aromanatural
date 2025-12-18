const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

/**
 * Schema para usuários administrativos
 * Gerencia autenticação e autorização do painel admin
 */
const adminSchema = new mongoose.Schema(
    {
        nome: {
            type: String,
            required: [true, 'Nome é obrigatório'],
            trim: true,
        },
        email: {
            type: String,
            required: [true, 'Email é obrigatório'],
            unique: true,
            lowercase: true,
            trim: true,
            match: [
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                'Por favor, insira um email válido',
            ],
        },
        senha: {
            type: String,
            required: [true, 'Senha é obrigatória'],
            minlength: [6, 'Senha deve ter no mínimo 6 caracteres'],
            select: false, // Não retorna a senha por padrão em queries
        },
        role: {
            type: String,
            enum: ['admin', 'superadmin'],
            default: 'admin',
        },
        ativo: {
            type: Boolean,
            default: true,
        },
        ultimoLogin: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
);

// Middleware para hash da senha antes de salvar
adminSchema.pre('save', async function (next) {
    // Apenas hash se a senha foi modificada
    if (!this.isModified('senha')) {
        return next();
    }

    try {
        const salt = await bcrypt.genSalt(10);
        this.senha = await bcrypt.hash(this.senha, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Método para comparar senha
adminSchema.methods.compararSenha = async function (senhaInformada) {
    return await bcrypt.compare(senhaInformada, this.senha);
};

// Método para atualizar último login
adminSchema.methods.atualizarUltimoLogin = async function () {
    this.ultimoLogin = Date.now();
    await this.save({ validateBeforeSave: false });
};

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
