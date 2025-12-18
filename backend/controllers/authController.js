const Admin = require('../models/Admin');
const { gerarToken } = require('../middleware/auth');

/**
 * @desc    Login do administrador
 * @route   POST /api/auth/login
 * @access  Public
 */
const login = async (req, res) => {
    try {
        const { email, senha } = req.body;

        // Validação básica
        if (!email || !senha) {
            return res.status(400).json({
                sucesso: false,
                mensagem: 'Por favor, forneça email e senha',
            });
        }

        // Busca admin com senha (select está false por padrão)
        const admin = await Admin.findOne({ email }).select('+senha');

        if (!admin) {
            return res.status(401).json({
                sucesso: false,
                mensagem: 'Credenciais inválidas',
            });
        }

        // Verifica se está ativo
        if (!admin.ativo) {
            return res.status(401).json({
                sucesso: false,
                mensagem: 'Usuário inativo. Contate o administrador',
            });
        }

        // Compara senha
        const senhaCorreta = await admin.compararSenha(senha);

        if (!senhaCorreta) {
            return res.status(401).json({
                sucesso: false,
                mensagem: 'Credenciais inválidas',
            });
        }

        // Atualiza último login
        await admin.atualizarUltimoLogin();

        // Gera token
        const token = gerarToken(admin._id);

        res.status(200).json({
            sucesso: true,
            mensagem: 'Login realizado com sucesso',
            token,
            admin: {
                id: admin._id,
                nome: admin.nome,
                email: admin.email,
                role: admin.role,
            },
        });
    } catch (error) {
        console.error('Erro no login:', error);
        res.status(500).json({
            sucesso: false,
            mensagem: 'Erro ao realizar login',
            erro: error.message,
        });
    }
};

/**
 * @desc    Obter dados do admin autenticado
 * @route   GET /api/auth/me
 * @access  Private
 */
const obterPerfil = async (req, res) => {
    try {
        const admin = await Admin.findById(req.admin.id);

        res.status(200).json({
            sucesso: true,
            dados: admin,
        });
    } catch (error) {
        console.error('Erro ao obter perfil:', error);
        res.status(500).json({
            sucesso: false,
            mensagem: 'Erro ao obter perfil',
            erro: error.message,
        });
    }
};

/**
 * @desc    Alterar senha do admin
 * @route   PUT /api/auth/senha
 * @access  Private
 */
const alterarSenha = async (req, res) => {
    try {
        const { senhaAtual, novaSenha } = req.body;

        if (!senhaAtual || !novaSenha) {
            return res.status(400).json({
                sucesso: false,
                mensagem: 'Por favor, forneça senha atual e nova senha',
            });
        }

        const admin = await Admin.findById(req.admin.id).select('+senha');

        // Verifica senha atual
        const senhaCorreta = await admin.compararSenha(senhaAtual);
        if (!senhaCorreta) {
            return res.status(401).json({
                sucesso: false,
                mensagem: 'Senha atual incorreta',
            });
        }

        // Atualiza senha
        admin.senha = novaSenha;
        await admin.save();

        res.status(200).json({
            sucesso: true,
            mensagem: 'Senha alterada com sucesso',
        });
    } catch (error) {
        console.error('Erro ao alterar senha:', error);
        res.status(500).json({
            sucesso: false,
            mensagem: 'Erro ao alterar senha',
            erro: error.message,
        });
    }
};

module.exports = {
    login,
    obterPerfil,
    alterarSenha,
};
